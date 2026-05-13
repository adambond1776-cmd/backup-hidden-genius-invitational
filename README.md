# backup-hidden-genius-invitational

This repository includes a simple static page with a working PDF download
button.

## How the PDF download works

- The public page is `index.html`.
- The download button links to:

  ```text
  documents/hidden-genius-invitational.pdf
  ```

- The link uses the HTML `download` attribute so most browsers will download
  the file instead of opening it in the same tab.

## Replace the sample PDF

The current PDF is a sample placeholder. To publish your real PDF:

1. Rename your PDF to `hidden-genius-invitational.pdf`.
2. Replace the file at `documents/hidden-genius-invitational.pdf`.
3. Commit and push the change.

Keeping the same filename means the download button in `index.html` will keep
working without any code changes.
