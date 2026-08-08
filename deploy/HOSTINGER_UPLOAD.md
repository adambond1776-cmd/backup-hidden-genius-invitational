# Hostinger upload package

Use `hostinger-upload.zip` when you need to put the static invitation page on Hostinger quickly.

## Build the ZIP after editing

From the repository root:

```sh
npm ci
npm run package:hostinger
```

That command rebuilds the site and regenerates `deploy/hostinger-upload.zip`.

## Upload steps

1. In Hostinger, open the website's **File Manager**.
2. Open the `public_html` folder.
3. Upload `hostinger-upload.zip`.
4. Extract it inside `public_html`.
5. Confirm `index.html`, `.htaccess`, `llms.txt`, `robots.txt`, `sitemap.xml`, and the `images/` folder are directly inside `public_html`.

Do not upload the full source project to `public_html`; upload this built ZIP instead.

This package inlines the app's CSS and JavaScript into `index.html` so Hostinger's
File Manager does not need to preserve an `assets/` folder during extraction.
Static book cover images are included in the `images/` folder and must be uploaded with the ZIP.

## Important limitation

This package deploys the frontend page. Form submissions and the preorder dashboard use PocketBase at `/hcgi/platform`, so those features require the PocketBase backend to be running on the hosting environment too.
