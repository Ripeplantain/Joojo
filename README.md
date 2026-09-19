# Joojo

Portfolio site for Emmanuel Gyang, a full-stack software engineer based in Accra, Ghana. It includes **Joojo**, an AI "digital twin" chat widget that answers visitor questions about Emmanuel's career, projects, and skills.

## Features

- Single-page portfolio with home, about, journey, portfolio, and contact sections, plus scroll-aware navigation.
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
```

Without the key the site still renders, but `POST /api/chat` returns a `503`.

### Run

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Project structure

```
app/
  api/chat/route.ts   Chat endpoint: system prompt, model, streaming response
  digital-twin.tsx    Joojo chat widget (client component)
  page.tsx            Portfolio page content
  layout.tsx          Root layout and metadata
  globals.css         Styles
public/               Static assets, including the downloadable resume PDF
```

## Customizing

- **Profile content:** edit the arrays at the top of `app/page.tsx` (journey, projects, capabilities).
- **What Joojo knows:** edit `DIGITAL_TWIN_INSTRUCTIONS` in `app/api/chat/route.ts`. Keep it in sync with the page content.
- **Model:** change the `MODEL` constant in `app/api/chat/route.ts`.
- **Resume:** replace the PDF in `public/` and update the link in `app/page.tsx`.

## Notes

- The chat endpoint is public and calls a paid model. Before deploying, add rate limiting and a spend limit on your OpenRouter key. See [review.md](review.md) for more detail.

## Deployment

The app deploys to any Next.js host, such as [Vercel](https://vercel.com). Set `OPENROUTER_API_KEY` in the host's environment variables.
