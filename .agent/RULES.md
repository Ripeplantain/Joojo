# Rules

Read `.agent/PROJECT.md` first. These rules apply to every change.

## Change as little as correctness allows

- Read the file you are changing in full first; every source file here is under 300 lines.
- Ask before adding any npm dependency. Install with `npm`, never `pnpm`.
- No unrelated refactors or reformatting. `app/globals.css` uses one rule per line on purpose; keep that shape.
- No dead code, commented-out code, or leftover scripts.

## Keep the structure the project has

Page content goes in the arrays at the top of `app/page.tsx`, markup in the matching `<section>` of the same file, styles in `app/globals.css`, server code in `app/api/<name>/route.ts`. Do not add a `components/`, `lib/`, or `src/` directory, or split `page.tsx`, unless the task asks for it.

## Profile content

- Never add or change a career fact (employer, date, role, project, skill, credential) without the owner confirming it. Ask; do not infer from the resume PDF or from other text on the page.
- When a confirmed fact changes, update both `app/page.tsx` and `DIGITAL_TWIN_INSTRUCTIONS` in `app/api/chat/route.ts` in the same commit, then check `suggestedQuestions` in `app/digital-twin.tsx` still make sense.
- Keep the system prompt's guardrails: answer only from the verified profile, do not invent, send out-of-scope questions to email.

## UI

- Plain CSS only, in `app/globals.css`. No Tailwind, CSS modules, CSS-in-JS, UI library, or icon package.
- Colors come from the custom properties in the `:root` block at the top of `app/globals.css`. Use them instead of new hex values; add a property there only if no existing one fits.
- Reuse the existing classes before writing new ones: `.section-wrap` for page width, `.section-kicker` and `.eyebrow` for labels, `.button` / `.button-primary` and `.text-link` for actions, `.reveal` / `.reveal-one` / `.reveal-two` for entrance animation.
- Arrows and marks are text characters (`->`, `↗`) wrapped in `aria-hidden` spans, not icons.
- Responsive rules go inside the existing `@media (max-width: 900px)` and `@media (max-width: 560px)` blocks near the end of the file. New animations must still be covered by the `prefers-reduced-motion` block.
- Keep the accessibility attributes the markup already uses: `aria-label` on landmarks and icon-only buttons, `aria-hidden` on decoration, `aria-live` on the chat message list.

## Verify before claiming

- Run `npm run lint && npx tsc --noEmit` before saying a task is done.
- There are no tests; do not add a test framework as a side effect. Verify by running `npm run dev` and looking at the change at desktop width and below 900px and 560px.
- Chat changes need a real request through the widget. That requires `OPENROUTER_API_KEY` and spends money, so say so if you could not exercise it.
- Report what you ran and what happened. If you could not run or view something, say so.

## Stay safe

- Never put secrets in code, logs, or commits. Configuration is environment variables only: `.env` locally (git-ignored), Vercel project settings in production.
- Do not deploy, or change Vercel or OpenRouter settings, unless asked.

## Git

- Branch before the first edit, named `<type>/<short-slug>` (for example `fix/chat-scroll`). Never commit to `main` unless told to.
- Commit each unit once it is coherent and passes the checks above. Stage by path; never `git add -A` or `git add .`.
- Messages: a sentence-case imperative subject with no prefix and no period, as in `Update README with project overview and setup`.
- Do not push or merge unless asked.
