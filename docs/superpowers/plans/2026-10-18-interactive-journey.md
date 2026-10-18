# Interactive career journey

**Goal:** Keep the existing portfolio and classic CV, adding a header link to a full-screen interactive career view inspired by the supplied four-track timeline.

**Architecture:** An independently lazy-loaded React view at `?view=journey`, using existing localized CV queries. A pure chronological model maps narrative seconds to documented calendar years; a single requestAnimationFrame clock controls playback, seeking, scene geometry and transitions. SVG scenes remain interactive without a GPU requirement.

**Constraints:** Preserve existing routes, exports and print behavior. Use the existing dependencies. Do not invent career dates, acquisition dates, metrics or operational data. Keep personal work separate. Support FR/EN, keyboard, touch, reduced motion, static GitHub Pages hosting and an always-visible classic CV link.

- [x] Model and tests: source-derived events, chronological ordering, balanced chapter durations, calendar/narrative mapping, boundary and direct-seek behavior.
- [x] Controller and view: playback, pause, speed, previous/next, restart, keyboard and calendar scrubbing; visibility suspension and reduced motion.
- [x] Scenes: isometric industrial environment, augmented operator view, modular Edge interface, synthetic maritime map and personal project experiments. Persistent geometry and deterministic motion; accessible scene controls and project details.
- [x] Timeline and integration: four proportionate tracks, project selection, contextual skills, personal explorations, lazy route and header links.
- [x] Verification: targeted interaction tests, full test suite, TypeScript production build, lint, bundle check and browser checks at desktop/mobile sizes.

Review focus: same-year events, switching languages during playback, pause/seek determinism, small/short viewports, query errors and browser back navigation.

Validation: 78 tests across 26 files, production build, ESLint and initial-bundle budget check. Browser checks at 1440×900 and 390×844, with no document overflow in the immersive view; source CV return link, project dialogs, language switch and module selection exercised. Read-only review found an essential-query loading/error issue, fixed with regression coverage. No added runtime dependencies; journey code and styles load separately from the existing portfolio.
