# backup-hidden-genius-invitational

## Editing and publishing the Hostinger site

Edit the React source in `apps/web/src`, then run:

```sh
npm ci
npm run package:hostinger
```

Upload `deploy/hostinger-upload.zip` to Hostinger File Manager and extract it inside
`public_html`. The live folder should contain `index.html`, `.htaccess`, `llms.txt`,
`robots.txt`, and `sitemap.xml` directly in `public_html`.
