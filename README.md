# Joojo

Portfolio site for Emmanuel Gyang, a full-stack software engineer based in Accra, Ghana. It includes **Joojo**, an AI "digital twin" chat widget that answers visitor questions about Emmanuel's career, projects, and skills.

## Features

- Single-page portfolio with work, about, expertise, experience, and contact sections, plus scroll-aware navigation.
- Downloadable CV, served from `public/`.
- Joojo chat widget with streaming responses, suggested questions, and a stop button.
- Chat answers are limited to a verified profile set in the system prompt. Anything outside it points visitors to email.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- [AI SDK](https://ai-sdk.dev) (`ai`, `@ai-sdk/react`) with the [OpenRouter provider](https://github.com/OpenRouterTeam/ai-sdk-provider)
- Plain CSS (`app/globals.css`)

## Getting started

### Prerequisites

- Node.js 20 or later
- An [OpenRouter](https://openrouter.ai) API key

### Setup

```bash
npm install
```

Create a `.env` file in the project root:

```bash
OPENROUTER_API_KEY=your_key_here
CHAT_TOKEN_SECRET=a_long_random_string
```

`CHAT_TOKEN_SECRET` signs the short-lived tokens the chat widget needs to call the endpoint; generate one with `openssl rand -base64 32`. Without both values the site still renders, but `/api/chat` returns a `503`.

### Run

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Design

The site is built in one visual world, **Dark Cinematic**: warm near-black `#0c0a08`, bone
`#ede7dc`, and a single brass `#c79a4b` used as light rather than paint. Gloock carries the
display type at monumental scale, Epilogue everything that is read. `DESIGN.md` records the
system; the direction contract it was built against is in `.impeccable/briefs/`.

It was chosen from five independent concepts built at `/v1` – `/v5`. Those routes, and the
`/preview` harness that compared them, were removed when this one was promoted to `/`.

Verified content is single-sourced: `app/portfolio-data.ts` is the only place a career fact is
written, and a confirmed change there still needs the matching edit to
`DIGITAL_TWIN_INSTRUCTIONS` in `app/api/chat/route.ts`.

There are no project screenshots and no public project links. Image areas are reserved as flat
CSS placeholders at fixed aspect ratios, so dropping in a real screenshot needs no layout change.

## Project structure

```
app/
  api/chat/route.ts   Chat endpoint: system prompt, model, streaming response
  page.tsx            The portfolio page (markup only; no facts)
  layout.tsx          Root layout, fonts, and metadata
  globals.css         The whole stylesheet, scoped under `.eg`
  portfolio-data.ts   Verified profile content — the single source for every career fact
  joojo.tsx           Joojo chat widget (client component)
  use-page.ts         Reveal and nav-highlight behaviour
  icon.svg            Favicon: the page's own Gloock "E"
public/               Static assets, including the downloadable resume PDF
```

## Customizing

- **Profile content:** edit `app/portfolio-data.ts` (profile, projects, roles, capabilities, education, certifications).
- **What Joojo knows:** edit `DIGITAL_TWIN_INSTRUCTIONS` in `app/api/chat/route.ts`. Keep it in sync with `app/portfolio-data.ts`.
- **Model:** change the `MODEL` constant in `app/api/chat/route.ts`.
- **Resume:** replace the PDF in `public/` and update `links.resumeHref` in `app/portfolio-data.ts`.

## Notes

- The chat endpoint calls a paid model. It only accepts same-origin requests carrying a short-lived signed token, which stops other sites and direct posts but not a script that fetches a token first. Before deploying, add rate limiting and a spend limit on your OpenRouter key. See [review.md](review.md) for more detail.

## Deployment

The app deploys to any Next.js host, such as [Vercel](https://vercel.com). Set `OPENROUTER_API_KEY` and `CHAT_TOKEN_SECRET` in the host's environment variables.
