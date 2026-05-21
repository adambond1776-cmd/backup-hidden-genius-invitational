# Hostinger upload package

Use `hostinger-upload.zip` when you need to put the static invitation page on Hostinger quickly.

## Upload steps

1. In Hostinger, open the website's **File Manager**.
2. Open the `public_html` folder.
3. Upload `hostinger-upload.zip`.
4. Extract it inside `public_html`.
5. Confirm `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, and `llms.txt` are directly inside `public_html`.

Do not upload the full source project to `public_html`; upload this built ZIP instead.

This package inlines the app's CSS and JavaScript into `index.html` so Hostinger's
File Manager does not need to preserve an `assets/` folder during extraction.

## Important limitation

This package deploys the frontend page. Form submissions and the preorder dashboard use PocketBase at `/hcgi/platform`, so those features require the PocketBase backend to be running on the hosting environment too.
