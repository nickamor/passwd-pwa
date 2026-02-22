# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Password generator PWA built with Preact, htm, and Redux Toolkit. Uses Bun for bundling TypeScript source into browser-ready ESM bundles.

## Commands

```bash
npm install          # Install dependencies
npm run build        # Build icons + JS bundles + CSS
npm run build:icons  # Generate icon-192.png and icon-512.png from icon.svg
npm run build:js     # Bundle app (src/app/app.ts -> public/app.js)
npm run build:js:sw  # Bundle service worker (src/sw/sw.ts -> public/sw.js)
npm run build:css    # Build Tailwind CSS (src/app.css -> public/app/app.css)
npm run dev:css      # Watch mode for Tailwind CSS development
```

No test or lint commands are configured (`npm test` is a placeholder that exits with an error).

Requires ImageMagick (`magick`) for icon generation. Icons are built from `icon.svg` with a `#252831` background at 75% scale (144px / 384px) to keep content within the maskable icon safe zone.

To run locally, serve the `public/` directory with any static file server (e.g., `npx serve public` or VS Code Live Server). Use `npm run dev:css` in a separate terminal for CSS hot reload during development.

## Architecture

**Bun bundler** - Source in `src/`, bundled output in `public/`. TypeScript files (`.ts`) but no type annotations used.

**htm templating** - Components use htm tagged template literals instead of JSX:
```javascript
import htm from "htm";
import { createElement as h } from "preact";
const html = htm.bind(h);
// Then use: html`<div>...</div>`
```

**State management** - Redux Toolkit with feature slices:
- `src/app/store.ts` - `configureStore` with password, options, and optionsApi slices
- `src/app/features/password/passwordSlice.ts` - Password generation using `createAsyncThunk`
- `src/app/features/options/optionsSlice.ts` - Options state (showOptions, option values)
- `src/app/features/options/optionsApi.ts` - RTK Query API for fetching options from `./api/options`
- `src/app/features/options/optionsEffects.ts` - Listener middleware for init action
- Components subscribe to store via `store.subscribe()` + `useState`

**Service worker** - Offline-first PWA with caching:
- `src/sw/sw.ts` - Service worker source with install/activate/fetch handlers
- Cache-first strategy for app shell (HTML, JS, CSS)
- **Virtual API**: `/api/options` has no backend. GET is cache-first; POST writes the request body into the cache as a new Response — the service worker is the persistence layer
- Cache name is `cache@2.0` (version in `src/sw/sw.ts`); bump this when updating cached resources
- Automatic old-cache cleanup on activate

**Styling** - Tailwind CSS v4 with custom theme configuration:
- `src/app.css` - Tailwind source with theme customization (colors, fonts, animations)
- `public/app/app.css` - Generated CSS output (do not edit directly)

**Key files:**
- `src/app/passwd.ts` - Core password generation logic
- `src/app/components/App.ts` - Main component with store subscription
- `src/app/app.ts` - Entry point, renders app and registers service worker
- `public/index.html` - App shell, loads bundled `app.js`
- `public/manifest.json` - PWA manifest for installability
- `public/api/options` - Static JSON endpoint for default options

## File Structure

```
src/
  app/
    components/       # Preact components (App, Collapse, Input, etc.)
    features/
      password/       # Password slice + thunk
      options/        # Options slice + RTK Query API + effects
    app.ts            # Entry point
    store.ts          # Redux store config
    passwd.ts         # Password generation logic
    service.ts        # Service worker registration
  sw/
    sw.ts             # Service worker source
  app.css             # Tailwind CSS source

public/
  app/
    app.css           # Generated Tailwind CSS
  api/
    options           # Static JSON options endpoint
  app.js              # Bundled app (generated, do not edit)
  sw.js               # Bundled service worker (generated, do not edit)
  index.html          # App shell
  manifest.json       # PWA manifest
```
