# Workflow

How to carry out a task in this project. Context is in `.agent/PROJECT.md`; constraints are in `.agent/RULES.md`.

## Size the task first

| Size | Examples | What it needs |
|---|---|---|
| Trivial | Typo, spacing, a copy tweak that states no career fact | Make the change, check the diff |
| Small | A layout bug in one section, a new class in `app/globals.css` | Read the surrounding code, change, verify, self-review |
| Standard | A new page section, a change to the chat widget's behavior | All steps below |
| Significant | Anything in `app/api/chat/route.ts` (model, system prompt, token limit), a new dependency, a new route, splitting `app/page.tsx` | All steps, plus a written plan agreed before implementing |

## Steps

1. **Understand.** Restate what is wanted. Read the file involved in full and the nearest comparable section or handler.
2. **Plan.** List the changes and how you will verify them. Ask about anything the code cannot answer; career facts always go to the owner.
3. **Implement.** Branch first. Make the smallest change that does the job, in the existing structure.
4. **Verify.** Run `npm run lint && npx tsc --noEmit`. Then run `npm run dev` and look at the change at desktop width, below 900px, and below 560px. A chat change needs a real request through the widget, which spends money on the model; say so if you could not exercise it.
5. **Review.** Read your own diff from the top. Remove anything the task did not require.
6. **Report.** What changed, what you ran and the result, what you did not verify, any follow-up.

## Fixing a bug

Reproduce it first in `npm run dev`, at the viewport width where it shows. Find the cause, not just the symptom. There is no test suite, so the proof of the fix is the same reproduction no longer failing; describe it in the report. Check whether the same mistake exists in the other sections of `app/page.tsx` or the other media-query block.

## Updating profile content

The most common task here: syncing the site with a new CV.

1. Get the changed facts confirmed by the owner. Do not read them off the PDF yourself.
2. Update the `journey`, `projects`, and `capabilities` arrays in `app/page.tsx`.
3. Make the same change in `DIGITAL_TWIN_INSTRUCTIONS` in `app/api/chat/route.ts`.
4. Check `suggestedQuestions` in `app/digital-twin.tsx` still have answers in the profile.
5. If the resume PDF is replaced, put the new file in `public/` and update the URL-encoded `href` on the download link in `app/page.tsx` if the filename changed.
6. Commit all of it together, then verify as in step 4 above and ask the widget one question the change affects.
