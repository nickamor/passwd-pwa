# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Password generator PWA built with Preact and htm. No build step required for development - the app uses native ES modules with browser import maps.

## Commands

```bash
npm install          # Install dependencies
npm run build        # Copy vendor files + build Tailwind CSS
npm run build:vendor # Copy vendor files (htm, preact) from node_modules to public/vendor
npm run build:css    # Build Tailwind CSS (src/app.css -> public/app/app.css)
npm run dev:css      # Watch mode for Tailwind CSS development
```

To run locally, serve the `public/` directory with any static file server (e.g., `npx serve public` or VS Code Live Server). Use `npm run dev:css` in a separate terminal for CSS hot reload during development.

## Architecture

**No bundler** - Uses native ES modules and browser import maps (defined in `index.html`). Components use `.mjs` extension.

**htm templating** - Instead of JSX, components use htm tagged template literals:
```javascript
import htm from "htm";
import { createElement as h } from "preact";
const html = htm.bind(h);
// Then use: html`<div>...</div>`
```

**State management** - Redux-style pattern using Preact's `useReducer` hook:
- `store.mjs` - Initial state and options defaults
- `reducer.mjs` - Root reducer handling actions: `generate`, `toggleOptions`, `changeOption`
- Actions dispatched from `App.mjs`

**Styling** - Tailwind CSS v4 with custom theme configuration:
- `src/app.css` - Tailwind source with theme customization (colors, fonts, animations)
- `public/app/app.css` - Generated CSS output (do not edit directly)

**Key files:**
- `public/app/passwd.mjs` - Core password generation logic
- `public/app/components/App.mjs` - Main component with state management
