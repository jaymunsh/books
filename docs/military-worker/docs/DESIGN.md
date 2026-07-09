# 눈 떠보니 9급 군수직 군무원 Design System

## 1. Atmosphere & Identity

An editorial study manual that feels approachable at first glance and rigorous once reading begins. The signature is a "desk-ready prologue": warm paper surfaces, quiet blue ink accents, compact exam-prep checklists, and a dimensional book-cover object that makes the project feel like a real guidebook rather than a generic landing page.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
| --- | --- | --- | --- | --- |
| Surface/primary | `--surface-primary` | `#ffffff` | `#151515` | Page canvas |
| Surface/secondary | `--surface-secondary` | `#f7f7f4` | `#20201d` | Alternating bands |
| Surface/elevated | `--surface-elevated` | `#ffffff` | `#272723` | Cards, callouts |
| Surface/ink | `--surface-ink` | `#111111` | `#f4f1ea` | High-contrast controls |
| Text/primary | `--text-primary` | `#191917` | `#f5f2ec` | Headlines, body |
| Text/secondary | `--text-secondary` | `#5f625c` | `#c2bdb2` | Supporting copy |
| Text/tertiary | `--text-tertiary` | `#898b84` | `#8f8a80` | Captions, metadata |
| Border/default | `--border-default` | `#deded7` | `#3a3933` | Cards, dividers |
| Border/subtle | `--border-subtle` | `#ecece6` | `#2f2e29` | Soft separators |
| Accent/primary | `--accent-primary` | `#2463a6` | `#7db4f0` | Links, focus, progress |
| Accent/hover | `--accent-hover` | `#164d83` | `#a7cdf5` | Interactive hover |
| Accent/soft | `--accent-soft` | `#e8f1fb` | `#1c3146` | Badges, markers |
| Status/success | `--status-success` | `#2f6f4e` | `#91d0a8` | Completion cues |
| Status/warning | `--status-warning` | `#8a5a12` | `#e7bd71` | Cautions |
| Status/info | `--status-info` | `#2463a6` | `#7db4f0` | Informational labels |
| Overlay/scrim | `--overlay-scrim` | `rgba(25, 25, 23, 0.34)` | `rgba(0, 0, 0, 0.46)` | Mobile drawers and modal backdrops |

### Rules

- Light mode is the default, regardless of system preference.
- Dark mode uses the same semantic tokens through `[data-theme="dark"]`.
- Pages set `color-scheme` from the active theme so browser-native scrollbars and controls do not drift into the opposite mode.
- Accent blue is reserved for navigation, focus, and progress. Warm neutrals carry the reading surface.
- Raw color values appear only in token definitions.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| Display | 56px desktop / 44px tablet / 34px mobile | 800 | 1.08 | 0 | Book title |
| H1 | 40px desktop / 34px tablet / 28px mobile | 800 | 1.18 | 0 | Major section |
| H2 | 28px desktop / 24px mobile | 750 | 1.28 | 0 | Subsection |
| H3 | 20px | 750 | 1.35 | 0 | Card title |
| Body/lg | 18px | 500 | 1.75 | 0 | Lead paragraphs |
| Body | 16px | 400 | 1.75 | 0 | Main reading text |
| Body/sm | 14px | 500 | 1.6 | 0 | Secondary info |
| Caption | 12px | 700 | 1.4 | 0 | Labels, metadata |

### Font Stack

- Primary: `Pretendard, Apple SD Gothic Neo, Noto Sans KR, Segoe UI, system-ui, sans-serif`
- Serif accent: `Georgia, Times New Roman, serif` for numeric or Latin details only.
- Mono: `SFMono-Regular, Consolas, Liberation Mono, monospace`

### Rules

- Korean body copy prioritizes natural line breaks with generous line height.
- No viewport-width font scaling. Responsive type changes happen only at media query breakpoints.
- Letter spacing stays at 0 for Korean readability.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a 4px base.

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | `4px` | Tight inline gaps |
| `--space-2` | `8px` | Compact controls |
| `--space-3` | `12px` | List and badge gaps |
| `--space-4` | `16px` | Body groups |
| `--space-5` | `20px` | Section internals |
| `--space-6` | `24px` | Card padding |
| `--space-8` | `32px` | Grid gaps |
| `--space-10` | `40px` | Subsections |
| `--space-12` | `48px` | Section rhythm |
| `--space-16` | `64px` | Major rhythm |
| `--space-20` | `80px` | Hero spacing |

### Grid

- Max content width: `1160px`.
- Reading width: `760px`.
- Hero grid: two columns on desktop, one column below `900px`.
- Breakpoints: mobile `680px`, tablet `900px`, desktop `1160px`.

### Rules

- Page sections are full-width bands with constrained inner content.
- Cards are only used for repeated items, callouts, or framed tools.
- No card nesting.

## 5. Components

### Header

- **Structure**: landmark header, brand text link, optional contextual links, icon-only theme toggle button.
- **Spacing**: `--space-4` vertical, `--space-5` horizontal.
- **States**: links underline on hover; toggle has hover, active, and visible focus.
- **Accessibility**: sticky skip link, `aria-label` on theme toggle, semantic `nav`.
- **Responsive**: mobile headers stay compact; orientation pages do not need a top table of contents when primary actions exist in the body.
- **Motion**: 150ms opacity and transform only.

### Book Cover Visual

- **Structure**: semantic figure with a CSS-rendered cover, binding, page stack, and metadata strip.
- **Variants**: light and dark token-driven treatments.
- **Spacing**: `--space-6` to `--space-8`.
- **States**: static, no decorative motion.
- **Accessibility**: descriptive `aria-label`; no meaningful text hidden only inside the visual.

### Content Band

- **Structure**: full-width `section`, constrained `.section-inner`, optional eyebrow, heading, body.
- **Variants**: primary, secondary, compact.
- **Spacing**: `--space-16` desktop, `--space-12` mobile.
- **Accessibility**: each section has a unique heading.

### Checklist Item

- **Structure**: ordered or unordered item with a square marker, title, and description.
- **Variants**: success, warning, neutral.
- **Spacing**: `--space-4` inner, `--space-3` gap.
- **States**: static; links inside follow normal focus and hover states.

### Reading Callout

- **Structure**: bordered aside with short title and body.
- **Variants**: promise, caution, route.
- **Spacing**: `--space-6` padding.
- **Accessibility**: `aside` only for tangential or summary content.

### Mode Toggle Button

- **Structure**: native icon-only `button` that switches between moon and sun SVG symbols.
- **States**: default, hover, active, focus.
- **Accessibility**: updates `aria-pressed`, `aria-label`, and `title`; SVGs are `aria-hidden`.

### Chapter Map

- **Structure**: compact chapter-index panel with numbered anchors and one-line outcomes.
- **Variants**: part overview, problem-practice roadmap.
- **Spacing**: `--space-5` item padding, `--space-3` item gap.
- **States**: anchor rows use hover text color and visible focus.
- **Accessibility**: `nav` with `aria-label`; each anchor points to either a lesson page or an in-page section.

### Comparison Table

- **Structure**: two or three columns comparing choices with label, core work, and preparation implication.
- **Variants**: 군수직 vs 행정직, 맞는 사람 vs 다시 생각할 사람.
- **Spacing**: `--space-5` cell padding, `--space-4` row gap on mobile.
- **Accessibility**: use semantic table for true comparisons; collapse to card-like rows on mobile without hiding headers.

### Duty Map

- **Structure**: responsive grid of duty cards grouped by the flow of 군수 work.
- **Variants**: 업무 흐름, 시험과목 연결.
- **Spacing**: `--space-6` card padding and `--space-4` grid gap.
- **States**: static reading cards; links inside follow normal states.
- **Accessibility**: ordered flow uses explicit sequence labels, not color alone.

### Practice Roadmap

- **Structure**: three-column map for 국어, 행정법, 경영학 that points readers toward later problem-solving pages.
- **Variants**: intro preview, full 기출 HTML index.
- **Spacing**: `--space-6` card padding, `--space-3` internal list gap.
- **States**: future links can become anchors or page links; disabled/upcoming state uses text and muted color together.
- **Accessibility**: upcoming labels are plain text, not only visual badges.

### Learning Reader

- **Structure**: integrated study layout with a sticky left book table of contents and central lesson body.
- **Variants**: orientation-linked chapter lesson, exam-procedure manual lesson, roadmap lesson, completion-check lesson.
- **Spacing**: `--space-6` between regions, `--space-5` inside panels, compact rhythm inside the article.
- **States**: current lesson link is marked with `aria-current` and follows scroll position across every learning unit.
- **Accessibility**: main article keeps one `h1`; the table of contents is a labelled `nav`.
- **Scrolling**: left table of contents scrolls internally with a token-colored subtle scrollbar and keeps the current lesson link in view as the reader scrolls.
- **Content rule**: learning screens exclude the prologue and orientation sections from the table of contents. The integrated learning reader tracks the book body from `1부` through `부록`, but it is a 수험 절차 리더 for eligibility, planning, application, exam-day, interview, and appointment flow. Subject theory for `5부` 국어, `6부` 행정법, and `7부` 경영학 lives in dedicated textbook pages, and mixed practice lives in the problem-bank page.
- **Practice-book rule**: concept and explanation sections read as a continuous paper page, not a stack of rounded cards. Use horizontal rules, table rows, numbered strips, and left-rule callouts; reserve framed boxes for actual questions, answer explanations, and compact checks.

### Mobile Lesson Navigation

- **Structure**: header-level `목차` button opens a slide-in learning navigation panel; the panel mirrors the integrated book-body table of contents from `1부` through `부록`.
- **Variants**: lesson outline, problem set outline.
- **Spacing**: `--space-5` panel padding, `--space-3` item gap.
- **States**: button updates `aria-expanded`; panel updates `aria-hidden`; backdrop, close button, and nav links close the panel.
- **Accessibility**: avoid placing the large table of contents before lesson content on mobile; keep it inside the drawer and keep touch targets at least 44px high.

### Reader Context Map

- **Structure**: compact secondary navigation outside lesson readers, such as on the orientation page or a dedicated table of contents page.
- **Variants**: part progress, full book outline.
- **Spacing**: `--space-4` block padding, `--space-2` row padding, `--space-1` row gap.
- **States**: current lesson uses `aria-current="page"`; upcoming lessons use disabled text plus a visible `준비 중` label.
- **Accessibility**: context maps are supplemental navigation for overview pages, not replacements for the integrated learning reader's full book-body table of contents.
- **Content rule**: orientation pages may preview the route, but the actual learning table of contents belongs in the integrated reader and starts at `1부`, not the prologue.

### Lesson Block

- **Structure**: section with eyebrow, heading, body, and optional rule/table/checklist.
- **Variants**: 핵심개념, 수험포인트, 예시, 주의, 핵심 개념 확장.
- **Spacing**: `--space-8` between blocks, `--space-4` to `--space-5` inside dense content.
- **States**: static reading content; links and controls follow normal focus states.
- **Accessibility**: headings preserve hierarchy; tables remain semantic.
- **Visual rule**: lesson blocks should feel like textbook sections on one page. Avoid repeated rounded cards for ordinary paragraphs; use card treatment only when the content is a true callout or repeated problem item.

### Practice Question

- **Structure**: problem number label, question stem, ordered answer choices, answer/explanation block, and choice-by-choice analysis.
- **Variants**: 예상 객관식, 계산형, 판례형, 문법 적용형.
- **Spacing**: `--space-6` above the problem, `--space-3` between choices, `--space-5` before explanations.
- **States**: static reading content now; future interactive grading can add selected/correct/incorrect states.
- **Accessibility**: answer choices remain ordered text, not image content; circled numbers are visible labels and the explanation repeats the answer.
- **Visual rule**: questions may use strong top rules and answer boxes, but individual choices should read like printed lines rather than separate UI cards.

### Subject Part Jump

- **Structure**: secondary `nav` appended below the subject table of contents with links to 1~12부 and the three subject manuals.
- **Variants**: subject current page, integrated reader destinations, practice destinations.
- **Spacing**: `--space-4` block padding, `--space-3` row rhythm.
- **States**: current subject page uses `aria-current="page"`; external links keep native link behavior.
- **Accessibility**: labelled navigation, touch targets follow the same row pattern as the subject table of contents.

### Subject Mobile TOC

- **Structure**: header-level `목차` button opens the subject table of contents as a left slide-in panel on subject, practice, and past-exam index pages.
- **States**: button updates `aria-expanded`; panel and backdrop update `data-open`; Escape, backdrop, and in-page links close the panel.
- **Accessibility**: on mobile, the reading body must render before the table of contents. The table of contents is hidden from normal page flow and exposed only through the labelled control.
- **Responsive**: desktop keeps the sticky left table of contents; mobile keeps the header compact and allows top navigation links to scroll horizontally instead of disappearing.

### Hanja Study List

- **Structure**: three-column printed list with 한자, 음훈, and exam-use meaning.
- **Variants**: core hanja, idioms, confused administrative terms.
- **Spacing**: `--space-3` row padding and `--space-4` column gap.
- **Responsive**: collapses to one column on mobile so Korean and Chinese characters do not squeeze.
- **Visual rule**: reads like a textbook vocabulary table, not flashcard UI.

### Administrative Principle Stack

- **Structure**: left principle label with code, right explanation with 요건·오답 표현·예시 points.
- **Variants**: 법률유보, 비례원칙, 신뢰보호, 평등원칙, later 판례 원칙.
- **Spacing**: `--space-5` row gap, strong top rule per principle, no narrow table columns.
- **Responsive**: two columns on desktop, one column on mobile.
- **Accessibility**: each principle is an article-like reading unit; point labels are text, not color-only cues.
- **Visual rule**: use this when the content is concept-heavy and table cells would squeeze Korean legal terms.

### Study Check

- **Structure**: compact checklist or question card at the end of a lesson.
- **Variants**: 확인문제, 오늘의 완료 체크, 오답 사유.
- **Spacing**: `--space-4` row gap, `--space-5` panel padding.
- **States**: native checkboxes are visible and keyboard-focusable.
- **Accessibility**: never rely only on color for correctness or completion.

### Past Exam Player

- **Structure**: original PDF viewer paired with a sticky answer panel, current question selector, clickable answer choices, compact 25-question navigator, progress summary, and a final answer-sheet view that lists every question with official answer and user selection.
- **Variants**: original yearly exam session, subject-only sample, fully transcribed detailed explanation page, future timed mock session.
- **Spacing**: `--space-6` inside the player, `--space-3` between choices, `--space-4` inside explanation boxes.
- **States**: unanswered, selected, revealed-correct, revealed-wrong, collapsed answer-sheet, answer-sheet review, reset; opening the final answer sheet counts every question as answer-revealed, while correct count still depends on the user's selected choices.
- **Accessibility**: choices are real buttons with `aria-pressed`; the active question number uses `aria-current`; explanations repeat the answer in text, not only color.
- **Visual rule**: keep the source exam visible as the authority and the answer panel as the active solving surface. Use compact side panels for progress and source links; final answer sheets should read like a printed 해설지, not a dashboard report.

### Past Exam Selector

- **Structure**: compact callout placed immediately before subject 예상 문제 sections, with a heading, one explanatory sentence, and year/PDF links.
- **Variants**: subject PDF selector, 국어 2026 interactive 풀이 selector.
- **Spacing**: `--space-5` padding, `--space-4` before link rows, `--space-2` between year links.
- **States**: links use default, hover, focus-visible, and optional primary variant for interactive 풀이 pages.
- **Accessibility**: the callout has a labelled heading; links are real anchors to PDFs or HTML pages.
- **Visual rule**: selector reads as a source note before expected problems, not as a dashboard card. Use the accent left rule to distinguish real 기출 sources from 자체 제작 예상 문제.

### Past Exam Index

- **Structure**: subject-grouped index page with a compact intro, one section per subject, year cards, PDF/source actions, and a 25-cell answer strip.
- **Variants**: all-year subject overview, yearly source card, interactive 풀이 highlight for a converted exam.
- **Spacing**: `--space-4` card padding, `--space-2` between answer cells, `--space-8` between subject groups.
- **States**: source links use default, hover, focus-visible, and primary variant for clickable 풀이 pages; PDF links keep native browser behavior.
- **Accessibility**: each subject section has a stable anchor; every answer cell repeats both question number and answer text.
- **Visual rule**: reads like a printed answer index, not a score dashboard. Keep answer cells compact and aligned so 25문항 정답표 can be scanned quickly on desktop and mobile.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 150ms | ease-out | Toggle, link hover |
| Standard | 220ms | ease-in-out | Theme color transition |
| Emphasis | 420ms | cubic-bezier(0.16, 1, 0.3, 1) | Initial content reveal |

### Rules

- Only animate `opacity` and `transform`.
- Theme transitions are short and disabled for `prefers-reduced-motion`.
- No decorative micro-animation that does not communicate state.

## 7. Depth & Surface

### Strategy

Mixed: whisper borders define document structure; low-opacity layered shadows make the book visual and callouts feel tactile.

| Level | Value | Usage |
| --- | --- | --- |
| Border | `1px solid var(--border-default)` | Cards, callouts, header |
| Soft shadow | `0 12px 36px var(--shadow-soft)` | Cover object |
| Fine shadow | `0 1px 2px var(--shadow-fine)` | Buttons, elevated snippets |

### Rules

- Standard card radius is `8px`; buttons are `6px`.
- Shadows are never the only separation for text-heavy content.
- Dark mode lowers contrast in surfaces before adding extra shadows.
