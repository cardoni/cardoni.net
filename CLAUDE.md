@AGENTS.md

## Notes for Claude

- Posts live in `content/posts/*.mdx`. The filename is the slug and the URL (`foo.mdx` → `/foo`), so don't rename existing posts. Their URLs, and the Disqus threads tied to them, have been live for years.
- `src/lib/mdx.ts` reads and parses posts. Go through its helpers, and the ones in `src/lib/url-utils.ts` and `src/lib/taxonomy.ts`, instead of reading `content/` directly or building category and tag URLs by hand.
- Old tag URLs are kept alive with redirects in `next.config.ts`. If you merge or rename a tag, add a permanent redirect there.
- `npm run build` runs `next build --webpack` on purpose. Don't switch it to Turbopack without checking that the build still works.
- Before calling a change done, run `npm run lint` and `npx vitest run` (plain `npm test` starts in watch mode when attached to a terminal).
- In Markdown, keep code fences and their contents flush left (no indentation).
- After opening a pull request, subscribe to its activity right away (no need to ask) and handle CI failures and review comments until it is merged or closed.
