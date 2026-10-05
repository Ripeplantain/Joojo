# Joojo

Single-page portfolio site for Emmanuel Gyang, with **Joojo**, an AI "digital twin" chat widget that answers visitor questions about his career from a fixed, verified profile.

## At a glance

| | |
|---|---|
| Topology | Single application |
| Languages | TypeScript (strict), CSS. Node.js 20 or later |
| Frameworks | Next.js 16.3 (App Router), React 19, AI SDK (`ai` 7, `@ai-sdk/react` 4) with `@openrouter/ai-sdk-provider` |
| Package manager | npm (`package-lock.json`). Ignore `pnpm-lock.yaml` and `pnpm-workspace.yaml`; they are leftovers |
| Deployed via | Vercel, with `OPENROUTER_API_KEY` set in the project's environment variables |

## Commands

Run from the repository root.

| Task | Command |
|---|---|
| Install | `npm install` |
| Run locally | `npm run dev` (http://localhost:3000) |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| Build | `npm run build` |

There is no test suite and no formatter.

**Before reporting a task complete, run:** `npm run lint && npx tsc --noEmit`

## Architecture

Everything is in `app/`. There is one route (`/`) and one API endpoint (`POST /api/chat`). No database, no auth, no shared component directory.

- `app/page.tsx` is a client component that renders every section of the page (home, about, journey, portfolio, contact). Its content comes from the `journey`, `projects`, and `capabilities` arrays at the top of the file.
- `app/digital-twin.tsx` is the chat widget, mounted at the bottom of `page.tsx`.
- `app/api/chat/route.ts` holds the model id (`MODEL`), the system prompt (`DIGITAL_TWIN_INSTRUCTIONS`), and the handler.

Chat flow: `useChat` with `DefaultChatTransport({ api: "/api/chat" })` in `digital-twin.tsx` posts `UIMessage[]` → `route.ts` returns `503` if `OPENROUTER_API_KEY` is unset, otherwise calls `streamText` through OpenRouter (`maxOutputTokens: 700`, `maxDuration = 30`) → the response streams back with `createUIMessageStreamResponse` and the widget renders the `text` parts of each message.

## Important directories

| Path | Contains |
|---|---|
| `app/` | All source: page, chat widget, root layout, the single stylesheet `app/globals.css` |
| `app/api/chat/` | The only server code |
| `public/` | The downloadable resume PDF. `app/page.tsx` links to it by its URL-encoded filename, so renaming the file means updating that link |

Do not edit: `next-env.d.ts`, `.next/`, `tsconfig.tsbuildinfo`, and the `nextjs-agent-rules` block in `AGENTS.md` (rewritten by `next dev`).

## Conventions

- **Next.js and AI SDK APIs:** both are newer than most training data. Follow `AGENTS.md`: read the relevant guide under `node_modules/next/dist/docs/` before writing Next.js code. For AI SDK calls, copy the forms already used in `app/api/chat/route.ts` and `app/digital-twin.tsx`, and check the installed package's types before using an API that is not already in those files.
- **API:** route handlers are `app/api/<name>/route.ts` exporting HTTP-method functions. Errors are plain-text `Response` objects with a status code, as in `app/api/chat/route.ts`.
- **UI:** plain CSS in `app/globals.css`, referenced by class name. Details in `.agent/RULES.md`.
- **Git:** one branch per task, sentence-case imperative commit subjects. Details in `.agent/RULES.md`.

## Constraints

- **Profile content lives in two places.** The arrays in `app/page.tsx` and the verified profile in `DIGITAL_TWIN_INSTRUCTIONS` must agree. A change to one is a change to both.
- **Career facts need the owner's confirmation.** Do not add or alter employers, dates, projects, skills, or credentials on your own.
- **`POST /api/chat` is public and calls a paid model, with no rate limiting.** Do not raise `maxOutputTokens`, loosen the system prompt's scope, or add tools to the model call without flagging the cost and abuse implications.
- **`.env` holds the real `OPENROUTER_API_KEY`.** Do not open, print, or commit it. The key is read only in `app/api/chat/route.ts` and must never reach a client component.

## Canonical documentation

These are authoritative. Read the relevant one before working in its area.

- `AGENTS.md`: the Next.js version warning and where its bundled docs are.
- `README.md`: features, setup, and the "Customizing" list of where each kind of content is edited.
- `node_modules/next/dist/docs/`: Next.js guides for the installed version (`01-app/` covers the App Router).

## Using this workflow

| Read | When |
|---|---|
| `.agent/RULES.md` | Before making any change |
| `.agent/WORKFLOW.md` | When starting a task: how to size it, the steps, and the profile-update procedure |

Workflow last verified against the repository on 2026-10-05.
