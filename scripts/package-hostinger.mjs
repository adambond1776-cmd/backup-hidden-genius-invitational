import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, cpSync, mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist/apps/web');
const deployDir = path.join(rootDir, 'deploy');
const outputZip = path.join(deployDir, 'hostinger-upload.zip');
const requiredFiles = ['.htaccess', 'index.html', 'llms.txt', 'robots.txt', 'sitemap.xml'];

const readBuiltAsset = (assetPath) => {
  const normalizedPath = assetPath.replace(/^\//, '');
  const absolutePath = path.join(distDir, normalizedPath);

  if (!absolutePath.startsWith(distDir) || !existsSync(absolutePath)) {
    throw new Error(`Unable to find built asset referenced by index.html: ${assetPath}`);
  }

  return readFileSync(absolutePath, 'utf8');
};

const inlineBuiltAssets = (html) => {
  let inlinedHtml = html;
  let inlinedScripts = 0;
  let inlinedStylesheets = 0;

  inlinedHtml = inlinedHtml.replace(
    /<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/g,
    (_tag, assetPath) => {
      inlinedScripts += 1;
      return `<script type="module">\n${readBuiltAsset(assetPath)}\n</script>`;
    },
  );

  inlinedHtml = inlinedHtml.replace(
    /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
    (_tag, assetPath) => {
      inlinedStylesheets += 1;
      return `<style>\n${readBuiltAsset(assetPath)}\n</style>`;
    },
  );

  if (inlinedScripts === 0 || inlinedStylesheets === 0) {
    throw new Error(
      `Expected to inline at least one JS and CSS asset; found ${inlinedScripts} script(s), ${inlinedStylesheets} stylesheet(s).`,
    );
  }

  return inlinedHtml;
};

if (!existsSync(path.join(distDir, 'index.html'))) {
  throw new Error('Build output not found. Run `npm run build` before packaging for Hostinger.');
}

mkdirSync(deployDir, { recursive: true });

const stagingDir = mkdtempSync(path.join(tmpdir(), 'hostinger-upload-'));

try {
  for (const fileName of requiredFiles) {
    const sourcePath = path.join(distDir, fileName);
    const targetPath = path.join(stagingDir, fileName);

    if (!existsSync(sourcePath)) {
      throw new Error(`Missing required build file: ${sourcePath}`);
    }

    if (fileName === 'index.html') {
      const html = readFileSync(sourcePath, 'utf8');
      writeFileSync(targetPath, inlineBuiltAssets(html));
    } else {
      cpSync(sourcePath, targetPath);
    }
  }

  rmSync(outputZip, { force: true });
  execFileSync('zip', ['-X', '-q', outputZip, ...requiredFiles], { cwd: stagingDir });

  const indexSize = statSync(path.join(stagingDir, 'index.html')).size;
  const zipSize = statSync(outputZip).size;

  console.log(`Created ${path.relative(rootDir, outputZip)} (${zipSize.toLocaleString()} bytes)`);
  console.log(`Inlined index.html is ${indexSize.toLocaleString()} bytes`);
  console.log(`ZIP contains: ${requiredFiles.join(', ')}`);
} finally {
  rmSync(stagingDir, { recursive: true, force: true });
}
