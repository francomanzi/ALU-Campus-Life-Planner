# Campus Life Planner

A concise, accessible web app to track campus tasks, study sessions, and events. Built with plain HTML, CSS, and JavaScript.

## Quick start

## Live demo

The site is published via GitHub Pages : https://francomanzi.github.io/ALU-Campus-Life-Planner/about.html


 Open the URL in your browser.

## Features

- Create, edit, delete events (description, duration, date, tag)
- Persistent `localStorage` with JSON import/export
- Safe regex search with highlighted matches (see `search.js`)
- Dashboard: totals, weekly target/progress, upcoming items, tag breakdown
- Live validation with inline messages and ARIA announcements

## Regex catalog (from `validators.js`)

- `^\S(?:.*\S)?$` — description: no leading/trailing spaces
- `^(0|[1-9]\d*)(\.\d{1,2})?$` — duration: non-negative, up to 2 decimals
- `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` — date: YYYY-MM-DD
- `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` — tag: letters, spaces, hyphens
- `\b(\w+)\s+\1\b` (i) — duplicate adjacent words
- `^(?!\d+$).+$` — prevent description from being digits-only

## Keyboard & accessibility

- `Tab` / `Shift+Tab`: navigate
- `Enter` / `Space`: activate controls
- `Escape`: close modal
- Semantic landmarks, labeled inputs, `aria-live` regions, and focus management on dialogs

## Tests

1. Serve the project (see Quick start).
2. Open `tests.html` — tests run on load and report `PASS` / `FAIL`.

## Files

- `index.html`, `about.html`, `dashboard.html`, `settings.html`, `tests.html`, `seed.json`
- `app.js`, `storage.js`, `state.js`, `ui.js`, `validators.js`, `search.js`

## Contact

Franco Manzi — d.manzi1@alustudent.com — https://github.com/francomanzi




