# backup-hidden-genius-invitational

This repository includes a simple static page with a working Sample Book PDF
download button.

## How the PDF download works

- The public page is `index.html`.
- The download button links to:

  ```text
  documents/sample-book.pdf
  ```

- The link uses the HTML `download` attribute so most browsers will download
  the file instead of opening it in the same tab.

## Replace the Sample Book PDF

To update the book PDF later:

1. Rename your PDF to `sample-book.pdf`.
2. Replace the file at `documents/sample-book.pdf`.
3. Commit and push the change.

Keeping the same filename means the download button in `index.html` will keep
working without any code changes.
