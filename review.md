# Code Review — joojo (Emmanuel Gyang portfolio + "Joojo" digital twin)

**Scope:** everything under `app/`, plus `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `pnpm-workspace.yaml`, `.gitignore`, and the repo root layout.
**Stack:** Next.js 16.3.5 (App Router), React 19.2, AI SDK v7 (`ai`, `@ai-sdk/react`), OpenRouter provider, plain CSS.
**Method:** read every source file and checked the chat route against the installed `ai@7.0.105` typings. I could not run `tsc`, `eslint` or `next build` (no `node` on the shell PATH), so nothing here is confirmed by a build. I did not verify that the OpenRouter model ID resolves.

## Summary

This is a tidy, cohesive small site with a clear visual identity. The chat integration uses the current AI SDK v7 APIs (`instructions`, standalone `toUIMessageStream`), and the CSS handles reduced motion and three breakpoints. The layout uses the typed `LayoutProps<"/">` helper, and the API key stays server-side and gitignored.

The main risks are all in the public chat endpoint. It is an unauthenticated, unbounded LLM proxy that you pay for. Beyond that, the page is a single client component for no good reason, a few accessibility gaps affect the chat widget, and the repo hygiene needs cleanup before the first commit.

| Priority | Theme |
|---|---|
| **P0 – fix before deploying** | Chat endpoint abuse/cost, client-controlled `system` messages, unvalidated body |
| **P1 – should fix** | Whole page is `"use client"`, chat a11y, lockfile/workspace/repo hygiene, missing font variable, model ID unverified |
| **P2 – improve** | Single source of truth for profile data, SEO metadata, CSS maintainability, animation/perf, tests/CI |

---

## P0 — Chat API route ([app/api/chat/route.ts](app/api/chat/route.ts))

### 1. No rate limiting or abuse protection (cost/DoS)
`POST /api/chat` is open to the internet and calls a paid model. Anyone can script it in a loop. `maxOutputTokens: 700` caps *output* only; there is no cap on requests or on *input*.

**Improve:**
- Rate-limit per IP (Vercel Firewall rate-limiting rule, or Upstash `@upstash/ratelimit`). Something like 10 requests/min and 50/day per IP is plenty for a portfolio.
- Set a hard monthly spend limit on the OpenRouter key.
- Optionally add a lightweight bot check (Turnstile or Vercel BotID) before the first message.

### 2. Client-supplied `system` messages can override the persona
`messages` comes straight from the request body and is passed through `convertToModelMessages`. `UIMessage` allows `role: "system"`, so a visitor can POST their own system message (or fake prior `assistant` turns) and steer the model away from the "verified profile only" rules. The whole point of the prompt is not to invent facts about a real person under their name, so this matters.

**Improve:** drop everything that isn't `user`/`assistant` before converting, and only keep text parts:

```ts
const safe = messages
  .filter((m) => m.role === "user" || m.role === "assistant")
  .map((m) => ({ ...m, parts: m.parts.filter((p) => p.type === "text") }));
```

### 3. No request validation or size limits
- `await req.json()` throws on malformed JSON → unhandled 500.
- The destructured `{ messages }` is a TypeScript cast, not validation. `messages` could be missing, not an array, or huge.
- The full history is re-sent on every turn, so a long conversation (or a crafted one) means unbounded input tokens.

**Improve:** validate with zod (or the SDK's `validateUIMessages`), cap message count (e.g. last 10), and cap characters per message (e.g. 1,000). Return `400` for bad input. Also check `Content-Length`/body size.

### 4. Upstream call isn't cancelled when the client disconnects
The **Stop** button calls `stop()` on the client, but `streamText` is never given the request's abort signal, so generation (and billing) can continue server-side.

**Improve:** pass `abortSignal: req.signal` to `streamText`.

### 5. Error handling and observability
- Errors from the provider (bad key, quota, model not found) are swallowed by the SDK's default masking, and nothing is logged. When Joojo "could not respond", you'll have no way to tell why.
- The 503 for a missing key returns a bare text body while other failures are different again.

**Improve:** add `onError` to `streamText` to `console.error` server-side (Vercel captures it), and return consistent JSON errors (`{ error: "..." }`) with correct status codes (400/429/503).

### 6. Model ID and provider construction
- `const MODEL = "~openai/gpt-sol-latest"` is hardcoded and I could not verify that this ID exists on OpenRouter. A wrong ID fails at runtime, not build time, and, per #5, silently.
- `createOpenRouter` is rebuilt on every request.

**Improve:** read the model from `process.env.CHAT_MODEL` with a known-good default, and create the provider once at module scope (after reading the key). Consider an OpenRouter fallback model list so an outage on one provider doesn't take the chat down.

### 7. Prompt lives inline in the route
A 20-line prompt embedded in a route handler is hard to diff and review. See "single source of truth" under P2.

---

## P1 — Should fix

### 8. The entire home page is a client component ([app/page.tsx:1](app/page.tsx#L1))
`"use client"` exists only because of the scroll-spy `useEffect`/`useState`. As a result the whole page, including all static copy and the `journey`/`projects` arrays, ships as client JS and hydrates, which is unnecessary for a mostly static portfolio.

**Improve:**
- Make `page.tsx` a Server Component.
- Extract only the nav into `<SiteNav />` (client) that owns the `IntersectionObserver`. `DigitalTwin` is already its own client component.
- Move the data arrays to `app/data/*.ts` (server-side, zero client JS).
- Also consider `:target`/`aria-current` semantics: set `aria-current="location"` on the active link, not just a CSS class.

### 9. Chat widget accessibility ([app/digital-twin.tsx](app/digital-twin.tsx))
- `aria-live="polite"` on the whole message list, which updates on every streamed token, will make screen readers chatter or repeat. Announce only the completed assistant message (or use `aria-busy` while streaming), and keep `aria-live` for the status/error line.
- Opening the panel doesn't move focus, and closing it doesn't return focus to the trigger. Focus the input on open; restore on close.
- No `Escape` to close; the panel isn't a `role="dialog"`/`region` with an accessible name.
- `aria-controls="emmanuel-chatbot-panel"` points at an element that doesn't exist while the panel is closed (it's conditionally rendered).
- Two buttons open the same widget (`.chatbot-trigger` and `.chatbot-label`), which is redundant for keyboard/AT users. Make the label `aria-hidden`/non-focusable or merge into one control.
- The close button's visible text is a bare `x`; use `×` or an SVG icon (the `aria-label` is fine).
- Errors are silent to AT: give `.twin-error` `role="alert"`.
- Mobile: `100vh` in the panel height should be `100dvh` so it doesn't overflow under browser chrome.

### 10. Chat UX/logic details
- `new DefaultChatTransport({ api: "/api/chat" })` is constructed on every render. Hoist it to module scope (or `useMemo`) since it's static.
- On error the user's text is already cleared (`setInput("")` runs before the response), so they can't retry without retyping. Expose `regenerate()` as a "Try again" button and/or restore the input on failure.
- `scrollTo({ behavior: "smooth" })` fires on every streamed chunk and can fight itself; use `"auto"` while streaming.
- Assistant replies are rendered as plain text with `white-space: pre-wrap`. If the model emits Markdown (lists, bold, links) users will see raw `**` and `-`. Either instruct the model "plain text only" in the prompt or render Markdown safely.
- `message.parts.map(...)` inside a `<p>` drops non-text parts silently; fine today but worth a comment.
- No message length limit on the `<input>` (`maxLength`), matching the server cap in #3.
- Conversation is lost on refresh. Fine for a portfolio; just be aware if you later want persistence.

### 11. Font variable is referenced but never defined
[globals.css:71](app/globals.css#L71) and [globals.css:102](app/globals.css#L102) use `var(--font-geist-mono)`, but [layout.tsx](app/layout.tsx) never loads Geist (it looks like leftover create-next-app CSS). Those elements silently fall back to generic `monospace`, and the body is plain Arial.

**Improve:** load fonts with `next/font` (e.g. `Geist_Mono`, plus a real body/display face) and set the variable on `<html>`, or delete the reference.

### 12. Repo and tooling hygiene
- **Two lockfiles** (`package-lock.json` and `pnpm-lock.yaml`). Pick one package manager and delete the other; add `"packageManager"` to `package.json` and `engines.node`.
- **[pnpm-workspace.yaml](pnpm-workspace.yaml) is invalid as written**: `allowBuilds: unrs-resolver: set this to true or false` is a placeholder from pnpm, not a value. Either set it to `true`/`false` (unrs-resolver is an ESLint resolver native build; `true` is normal) or remove the file. This is a single-package repo, so it isn't a workspace anyway.
- **No commits yet, and everything is untracked.** `Profile.pdf` and a second copy of the resume sit in the repo root. Only the copy in `public/` is meant to be served. A careless `git add .` would commit `Profile.pdf` (personal data). Move it out of the repo or gitignore it, and delete the duplicate resume.
- **No `.env.example`** even though `.gitignore` whitelists one. Add it with `OPENROUTER_API_KEY=` so setup is documented. `.env` itself is correctly ignored (good).
- No `README`. Document setup, env vars, model choice and deployment.
- `AGENTS.md` / `CLAUDE.md` are auto-generated by `next dev`. Commit them as the file itself says, so the tree stays clean.
- `@types/node` is `^20`; align it with the Node version you deploy on.

### 13. Resume download link
[page.tsx:107](app/page.tsx#L107) links to `/Emmanuel%20Gyang%20%E2%80%94%20Software%20Engineer%20Resume.pdf`: a percent-encoded em dash and spaces. It works but is fragile (copy/paste, proxies, analytics). Rename to `emmanuel-gyang-resume.pdf` and use `download="Emmanuel Gyang - Resume.pdf"` for a friendly saved name.

### 14. Buttons that look clickable but aren't
- Project cards have hover lift, a `->` arrow, and the timeline has a `↗` arrow, but neither links anywhere and neither is focusable. Either link them (case study, repo, company page) or remove the affordance.
- The third project card ("Portfolio / 2026 — Case studies loading") is a placeholder in production content. Replace it with a real project or hide it.

---

## P2 — Improvements

### 15. Single source of truth for profile facts
The same facts (employers, dates, stack, projects) are hand-written in three places: the system prompt, `journey`/`projects`/`capabilities` in `page.tsx`, and the resume PDF. They will drift, and the chatbot could then contradict the page.

**Improve:** create `app/data/profile.ts` (typed) and derive both the page and the prompt from it (`buildInstructions(profile)`). Also centralize repeated constants: the email `irvingmanny@gmail.com` appears in 3 places, and the LinkedIn/GitHub URLs are inline.

There is also a tone conflict to reconcile: the hero says "Open to thoughtful collaborations" while the prompt tells the model not to claim availability. That's fine if intentional, but put the wording in one place.

### 16. SEO and metadata ([app/layout.tsx](app/layout.tsx))
Only `title` and `description` are set. Add: `metadataBase`, Open Graph/Twitter card (with an image via `app/opengraph-image.tsx`), `alternates.canonical`, and JSON-LD `Person` structured data (name, jobTitle, worksFor, sameAs). This matters for a portfolio that people will share. Also add `robots.ts` and `sitemap.ts` (trivial for one page), and export `viewport`/`themeColor` if you want browser chrome to match.

### 17. Sitewide static text/data details
- "© 2026" is hardcoded; use `new Date().getFullYear()` (or accept it, but be aware).
- "04+ years", "03 domains explored", "01 north star" are decorative stats. Two of the three don't mean anything measurable. Consider real numbers or cut them.
- The nav builds `[["about","about"], ...]` where label and href are identical, so use a plain string array.
- `activeSection` starts as `"home"` even when the page loads at `#contact`. Initialize from `location.hash` in the effect.
- The scroll-spy `rootMargin: "-30% 0px -55%"` plus `.sort` by `intersectionRatio` is a bit fragile for tall sections; simplify to "last section whose top passed the 30% line".

### 18. CSS maintainability and quality ([app/globals.css](app/globals.css))
- 279 lines of dense single-line rules in one global file; readable now, but painful to diff and extend. Consider CSS Modules per component (`nav`, `hero`, `timeline`, `chat`), or at least split the chat styles into `digital-twin.module.css` so they are colocated with their component.
- Global class names like `.button`, `.eyebrow`, `.period` are generic and collision-prone.
- `!important` on `.twin-avatar` ([globals.css:151](app/globals.css#L151)) exists only to beat the `.twin-chat-header span { display:block }` rule. Fix the selector specificity instead.
- **Contrast and size:** `.hero h1 em` (`#84969a` on `#f4f2ec`) is roughly 2.9:1, below WCAG AA for large text (3:1) and well below it for anything smaller. Text sizes of 8–9px (`.signal-footer span`, `.footer`, `.project-top/bottom`) are too small to read comfortably. Aim for ≥11–12px.
- Focus styles: only the chat trigger has `:focus-visible`. Links, `.button`, chat prompts, and the close/send buttons rely on browser defaults or none. Add a global `:focus-visible` ring (e.g. `outline: 2px solid var(--orange); outline-offset: 3px`). The chat input removes its outline and relies only on a border colour change.
- `.site-shell { overflow: hidden }` will silently break any future `position: sticky` (e.g. a sticky header). Use `overflow-x: clip` if the goal is preventing horizontal scroll.
- Prefer design tokens for repeated literals (`#183a36`, `#91a5a0`, `rgba(255,255,255,.14)`, etc.).

### 19. Animation and performance
- Every `.reveal` block plays its animation **on page load**, including sections far below the fold, so by the time users scroll there the effect has already finished and is invisible. Trigger on scroll (`IntersectionObserver` adding a class, or CSS `animation-timeline: view()` with a fallback).
- The `.grain` overlay is a full-viewport `position: fixed` element with an SVG `feTurbulence` filter. That is expensive to rasterize on low-end devices. Pre-render it to a small tiling PNG/WebP instead.
- The ticker duplicates its content 2× but translates `-18%`, which doesn't correspond to one repeat width, so the loop visibly jumps. Make the track exactly two copies and animate `-50%`; mark the duplicate `aria-hidden`.
- Pause the ticker and pulse animations when off-screen or on hover if you want to reduce constant repaint (the reduced-motion query is already handled, which is good).

### 20. Types and config
- `next.config.ts` is empty. Consider `reactStrictMode` (default on in App Router) and security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and a CSP once you know your script needs).
- `FormEvent` import from `react` is fine, but with React 19 typings prefer `React.SyntheticEvent`/`FormEvent<HTMLFormElement>` typed inline; not an issue, just style.
- Enable stricter TS flags such as `noUncheckedIndexedAccess`. The `[...][0]` access in the scroll-spy would then be forced to handle `undefined` explicitly (it already uses `?.`).

### 21. Testing and CI
There are no tests and no CI. Suggested minimum:
- A Playwright smoke test (you already use it at work): page loads, nav anchors work, chat opens, and a mocked `/api/chat` streams a reply.
- A unit test for the route: rejects bad JSON (400), strips `system` messages, enforces size limits, returns 503 with no key.
- GitHub Actions running `pnpm lint`, `tsc --noEmit`, `next build`.
- Lighthouse CI or Vercel's checks for performance/a11y regression.

---

## Suggested order of work

1. **Harden `/api/chat`:** validate the body, drop non-user/assistant roles, cap history and length, add `abortSignal`, `onError` logging, rate limit, and a provider spend cap (#1–#5).
2. **Verify the model ID** and move it to an env var (#6).
3. **Repo cleanup before the first commit:** one lockfile, fix or remove `pnpm-workspace.yaml`, move `Profile.pdf` out, add `.env.example` and README (#12).
4. **Split the page:** Server Component page + client `SiteNav` + `data/profile.ts` shared with the prompt (#8, #15).
5. **Chat a11y and UX** (#9, #10), then **fonts, focus rings, contrast** (#11, #18).
6. **SEO/OG metadata**, then animation perf, tests and CI (#16, #19, #21).

## What's already good
- Correct, current AI SDK v7 usage (`instructions`, standalone `toUIMessageStream`, `DefaultChatTransport`).
- API key handled server-side, `.env` gitignored, and a clear 503 when it's missing.
- Typed `LayoutProps<"/">`, `strict` TypeScript, `rel="noreferrer"` on external links, `aria-hidden` on decorative glyphs, and a `prefers-reduced-motion` block.
- The persona prompt is well-scoped: "verified profile only", an explicit refusal path, and a contact fallback.
- Responsive layout with sensible breakpoints, and a consistent design-token palette in `:root`.
