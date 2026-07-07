# Project Rules

## Deployment Checklist

Before committing, pushing, or deploying this static books repository:

1. If a new book HTML file or book folder is added under `docs/`, update `docs/index.html` so the document list links to it.
   - Single-page books should link to `book-name.html`.
   - Folder-based books should link to `folder-name/`.
   - Keep the card title and description in Korean and consistent with the existing list style.

2. Every uploaded book HTML page must load and use `Noto Sans KR`.
   - Standalone HTML files should include:

     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
     ```

   - The main sans-serif font stack should put `"Noto Sans KR"` first.
   - Folder-based books may load the font once from their shared CSS with `@import`, but the shared `--font-sans` or equivalent stack must still put `"Noto Sans KR"` first.

3. Before pushing, verify the changed public entry points locally:
   - `docs/index.html` contains the new book link.
   - The new book URL returns HTTP 200 from a local static server.
   - The document list renders without horizontal overflow on mobile width.

4. Do not stage local/editor artifacts such as `.DS_Store` or tool-local settings.
