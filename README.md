# Solara Company Portal

A responsive company portal website built with plain HTML, CSS and JavaScript. No frameworks or build tools needed. The theme is a white and yellow combination.

## Files

```
company-portal/
├── index.html   Page structure and content
├── style.css    Theme, layout and responsive styles
├── script.js    Data, search, filters, form validation
└── README.md    This file
```

## Getting started

1. Keep all files in the same folder.
2. Open `index.html` in any modern browser.

An internet connection is only needed for the Google Fonts (Bricolage Grotesque and DM Sans). Without it, the page falls back to system fonts.

## Features

- Sticky header with a mobile menu
- Time-based greeting, live date and clock
- App search that filters the apps grid as you type
- App category tabs: All, Work, People, Finance
- News section with a featured story and update list
- Colleague directory with search by name, role, team or city
- Support request form with field validation and a confirmation message
- Keyboard focus styles and reduced-motion support

## Customising

**Company name and branding**
Replace "Solara" in `index.html` (page title, header brand, footer). The logo is a CSS circle (`.brand-mark` in `style.css`); swap it for an `<img>` if you have a logo file.

**Colours**
Edit the variables at the top of `style.css`:

| Variable | Purpose |
|---|---|
| `--white` | Base background |
| `--cream`, `--butter` | Light yellow backgrounds |
| `--sun`, `--sun-deep` | Main yellow accents |
| `--ink`, `--ink-soft` | Text and borders |

**Apps, news and people**
Edit the `APPS`, `NEWS` and `PEOPLE` lists at the top of `script.js`. Each app has a `name`, `desc`, `cat` (work, people or finance), `icon` and `href`. Set `href` to the real link for each tool.

**Contact details**
Update the IT, HR and Facilities details in the Support section of `index.html`.

**Today's schedule**
The three meetings in the hero card are static text in `index.html`. Replace them with real data or connect them to a calendar API.

## Limitations

- The support form and "Sign in" button are front-end only. To make them work, connect the form to a backend or form service and add real authentication.
- Directory and news data live in the JavaScript file. For live data, load them from an API with `fetch()`.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari.