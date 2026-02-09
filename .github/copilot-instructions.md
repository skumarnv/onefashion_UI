**Purpose**: Provide repository-specific guidance for AI coding assistants to be immediately productive.

**How to run**:
- `npm run dev`: Start the Vite dev server with HMR (use this to validate UI changes).
- `npm run build`: Create a production build (`dist/`).
- `npm run preview`: Serve the production build locally.
- `npm run lint`: Run ESLint across the project.

**Big picture architecture**:
- Frontend only: React + Vite app located under `src/`.
- Entry: `src/main.jsx` mounts the app; `App.jsx` contains top-level routes/layout.
- UI is organized into `container/` (page-level containers) and `components/` (reusable UI pieces).
- Styles: component-specific CSS files live alongside components (for example `container/login/AuthLanding.css`).
- State: `src/redux/` holds Redux logic. `src/redux/store/store.jsx` is the store entrypoint (note: the file currently imports `createStore` but is minimal).

**Key files to inspect when changing behavior**:
- `src/main.jsx` — app bootstrap and provider setup.
- `src/App.jsx` — layout and routing logic.
- `src/container/login/authlanding.jsx` and `src/container/login/login.jsx` — login flows and UI.
- `src/redux/store/store.jsx` and any files under `src/redux/reducer` — global state shape and reducers.
- `src/components/textbox/textbox.jsx` — example of a reusable component pattern.

**Patterns & conventions specific to this repo**:
- Uses `.jsx` files for React components (no TypeScript).
- CSS files live next to components named with `ComponentName.css` (follow this when adding styles).
- MUI (Material UI) is used for icons and components — import from `@mui/material` and `@mui/icons-material`.
- Redux is present but store scaffolding may be incomplete — prefer modifying reducers and wiring store in `src/redux/store/store.jsx`.
- Keep folder naming: `container/` for pages, `components/` for reusable pieces, `redux/` for state.

**Development notes and gotchas**:
- The project is Vite-based (see `vite.config.js`) — fast refresh is available via `npm run dev`.
- React version is 19.x; be careful with hooks and concurrent features that might differ from earlier versions.
- ESLint is configured; run `npm run lint` before submitting larger changes.
- There are no automated tests in the repo by default — rely on `npm run dev` and manual verification.

**When editing Redux**:
- Update reducers under `src/redux/reducer` and export them to the root reducer.
- Wire the combined reducer into `src/redux/store/store.jsx`. Example: create store with `createStore(rootReducer, applyMiddleware(...))` and export the store default.

**PR / commit guidance for AI edits**:
- Make minimal, focused diffs. Update only files required for the change.
- Run `npm run dev` to verify UI and HMR; run `npm run lint` to catch linting issues.
- Keep component styles colocated and prefer existing CSS filenames.

**If you find undocumented behavior**:
- Look at `src/container/*` for page-level logic and `src/components/*` for UI patterns.
- Inspect `package.json` for scripts and `vite.config.js` for build specifics.

**Merging guidance**:
- If `.github/copilot-instructions.md` already exists, preserve any human-authored sections and add missing project-specific details above.

If anything here is unclear or you want more detail about the Redux wiring, folder conventions, or common UI flows (login/register), tell me which area to expand.
