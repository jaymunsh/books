# Project Rules

## Deployment Checklist

Before committing, pushing, or deploying this static books repository:

1. If a new book is added under `docs/`, update `docs/index.html` so the document list links to it.
   - Store each book as `book-name/index.html`.
   - Link each book as `book-name/`.
   - Keep the card title and description in Korean and consistent with the existing list style.
   - The whole document card must open the same book URL, not only the cover image or `문서 열기` text.

## Book Covers

The document list uses a consistent book-cover series. Follow these rules when
adding or replacing a cover:

1. Store cover assets at `docs/imgs/covers/book-name.jpg`.
   - Use the same slug as the book directory.
   - Use a vertical 2:3 image, optimized as a 640 x 960 JPEG when practical.
   - Give the image a Korean alt label in the form `책 제목 표지`.

2. If a book has no cover yet, retain the empty 2:3 `.cover-link` area in its
   card.
   - Do not substitute unrelated stock imagery, icons, or a text placeholder.
   - The empty area should keep the existing quiet ivory background and still
     link to the book.

3. Generated covers should match the existing editorial series:
   - Warm ivory or off-white textured paper background.
   - Contemporary screen-print or paper-cut illustration with crisp geometric
     forms and generous negative space.
   - Use deep forest green, cobalt blue, coral or vermilion, and mustard as
     restrained accent colors.
   - Represent the book's topic with concrete objects or a clear scene.
   - Do not put titles, letters, numbers, logos, watermarks, borders, or device
     mockups into the artwork. Keep the title as HTML text in the document card.

2. Every uploaded book HTML page must load `Noto Sans KR` as a cross-platform fallback.
   - Standalone book `index.html` files should include:

     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
     ```

   - The main sans-serif font stack should put the preferred platform font first, such as `-apple-system` or `Apple SD Gothic Neo` on macOS, followed by `"Noto Sans KR"` before generic fallbacks.
   - Folder-based books may load the font once from their shared CSS with `@import`; the shared `--font-sans` or equivalent stack must include `"Noto Sans KR"` before generic fallbacks.

3. Before pushing, verify the changed public entry points locally:
   - `docs/index.html` contains the new book link.
   - The new book URL returns HTTP 200 from a local static server.
   - If a cover is present, its local image URL returns HTTP 200 and has a 2:3
     aspect ratio.
   - The document list renders without horizontal overflow on mobile width.

4. Do not stage local/editor artifacts such as `.DS_Store` or tool-local settings.
