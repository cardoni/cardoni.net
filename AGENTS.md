# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` – Next.js App Router pages/layouts.
- `src/components/` – Reusable React components (PascalCase files).
- `src/lib/` – Utilities/helpers (kebab-case, e.g., `markdown-utils.ts`).
- `src/data/` – Local data sources.
- `content/posts/` – MDX articles with YAML frontmatter; `content/media/` for assets.
- `tests/` – Vitest tests (unit, components) with JSDOM; setup in `tests/setup.ts`.
- `public/` – Static assets served as-is.

## Build, Test, and Development Commands
- `npm run dev` – Start dev server with Turbopack.
- `npm run build` – Production build with profiling/debug.
- `npm run start` – Serve production build.
- `npm run lint` – ESLint (Next.js config, TS aware).
- `npm test` / `npm run test:watch` – Run Vitest once / in watch mode.
- `npm run test:ui` – Vitest UI.
- `npm run test:coverage` – Coverage report (target ≥90%).

## Coding Style & Naming Conventions
- Language: TypeScript. Prefer functional React components.
- Indentation: 2 spaces; include semicolons; single quotes.
- Components: PascalCase (`AnimatedCard.tsx`). Pages follow App Router (`src/app/about/page.tsx`).
- Utilities: kebab-case (`url-utils.ts`). Tests mirror subject paths under `tests/` with `*.test.ts(x)`.
- Linting: ESLint (`eslint.config.mjs`) using `next/core-web-vitals` + TypeScript. Run `npm run lint` before PRs.

## Testing Guidelines
- Framework: Vitest + Testing Library (`jsdom`). Global setup: `tests/setup.ts` mocks Next.js navigation and `motion`.
- Write unit tests for utilities and component tests for rendering, a11y, and interactions.
- Name tests `*.test.ts` or `*.test.tsx`. Keep tests deterministic; avoid network and real timers.
- Aim for ≥90% coverage; add meaningful assertions over snapshots.

## Commit & Pull Request Guidelines
- Commits: small, focused, imperative subject (≤72 chars). Example: `fix(lib): normalize URL slugs with spaces`.
- PRs: clear description, linked issues, screenshots/GIFs for UI changes, and notes on tests/coverage.
- CI hygiene: ensure `npm run lint` and `npm test` pass locally.

## Security & Configuration Tips
- Do not commit secrets. MDX frontmatter should exclude sensitive data.
- Use canonical dash-format slugs for URLs; rely on helpers in `src/lib/` for normalization.

## Agent-Specific Notes
- Keep changes minimal and consistent with existing patterns. Update or add tests when modifying public APIs.
