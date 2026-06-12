# NEXUS — Setup & What's New

## What changed in this pass

NEXUS is now a real, end-to-end product instead of a UI demo:

1. **Cards are persisted.** Generating a card (manual or auto from Trending) now
   creates real `Idea` + `KnowledgeCard` rows in the database via
   `/api/generate-card` and `/api/auto-generate`. Refreshing no longer wipes
   your cards.
2. **Publish flow.** On the Dashboard → Cards tab, every card now has a
   **Publish to Marketplace** / **Unpublish** toggle (`PATCH /api/cards/[id]`).
   Only published cards appear in the public marketplace.
3. **Real marketplace data.** `/marketplace` now fetches published cards from
   `GET /api/cards` and shows them alongside the original demo catalog.
4. **Real card detail pages.** `/card/[id]` now fetches your real card from
   `GET /api/cards/[id]` when it's not one of the static demo cards.
5. **Purchases are tracked.**
   - Demo mode (no Stripe key): checkout immediately increments `purchases`
     on the real card in the DB.
   - Live mode (Stripe key set): `/api/checkout` creates a real Checkout
     Session, and `/api/webhooks/stripe` verifies the signature and
     increments `purchases` when `checkout.session.completed` fires.
6. **Session persistence.** Logging into the dashboard (email) now persists
   across reloads, and your cards are re-loaded from the database
   automatically.
7. **Recommendations** now blend real published cards with the demo catalog.
8. **Real AI generation via Groq.** `/api/generate-card` and `/api/auto-generate`
   now call `llama-3.3-70b-versatile` (via `GROQ_API_KEY`) to write the
   summary, key insights, framework, and action steps for each card. If the
   key is missing or the call fails, it falls back to the static templates —
   generation never breaks.
9. **Marketplace is pre-seeded with 10 real cards.** Your local DB
   (`prisma/db/custom.db`) now has 10 published, authored knowledge cards
   (AI prompting, SaaS validation, growth, DeFi, productivity, etc.) so the
   marketplace isn't empty. For production, run `prisma/seed-cards.sql`
   against your Postgres database (see below).

## Local setup

```bash
npm install
npx prisma generate
npx prisma migrate deploy   # applies the new published/authorName columns
npm run dev
```

The SQLite database lives at `prisma/db/custom.db` (already includes the new
columns — migration has been applied for you).

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — SQLite for local dev, Postgres for production (see below)
- `NEXTAUTH_URL` / `NEXTAUTH_SECRET` — required for auth sessions
- `STRIPE_SECRET_KEY` — leave blank to run in demo mode (no real payments)
- `STRIPE_WEBHOOK_SECRET` — only needed once you configure a live Stripe webhook

## Going live (Vercel + Postgres + Stripe)

SQLite does **not** persist on Vercel's serverless functions — every deploy
or cold start resets the file. Before deploying for real:

1. Create a free Postgres database (Neon or Supabase both work well).
2. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set `DATABASE_URL` in Vercel's project env vars to the Postgres connection
   string, then run `npx prisma migrate deploy` once (locally, pointed at the
   prod DB, or via a one-off Vercel build step).
3b. Seed the 10 starter cards into production:
   ```bash
   psql "$DATABASE_URL" -f prisma/seed-cards.sql
   ```
4. Get real Stripe keys (test mode first): set `STRIPE_SECRET_KEY` in Vercel.
5. In the Stripe Dashboard, add a webhook endpoint pointing to
   `https://yourdomain.com/api/webhooks/stripe` for the
   `checkout.session.completed` event, then copy the signing secret into
   `STRIPE_WEBHOOK_SECRET`.
6. Set `NEXTAUTH_URL` to your production URL and `NEXTAUTH_SECRET` to a long
   random string (`openssl rand -base64 32`).

## Distribution checklist (once live)

- Create a few real cards from the Trending tab, publish them.
- Use the existing `/api/waitlist` — share the waitlist signup link first to
  build an audience before the full launch.
- Cross-post the marketplace link via your other channels (Wahala HQ FB page,
  X/Twitter build-in-public threads, IndieHackers, r/SideProject).
- The `/api/analytics` dashboard tab now reflects real totals (users, cards,
  waitlist, revenue) once people start using the app.
