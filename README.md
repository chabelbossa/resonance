# Resonance

Resonance is a Next.js 16 text-to-speech and voice-cloning dashboard. It uses
Clerk for authentication and organizations, Prisma/PostgreSQL for voice and
generation records, Polar for usage billing, Cloudflare R2 for audio storage,
and a Chatterbox-compatible API for speech generation.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local PostgreSQL database and configure `.env.local`:

```bash
createdb resonance_dev
cp .env.example .env.local
```

The app expects these variables:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/resonance_dev
APP_URL=http://127.0.0.1:3230
POLAR_ACCESS_TOKEN=
POLAR_SERVER=sandbox
POLAR_PRODUCT_ID=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
CHATTERBOX_API_URL=
CHATTERBOX_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

For local UI verification without Clerk keys, enable the explicit demo mode:

```bash
LOCAL_DEMO_AUTH=true
NEXT_PUBLIC_LOCAL_DEMO_AUTH=true
SKIP_ENV_VALIDATION=true
```

Demo auth is intended for local development only. Production must use real
Clerk, Polar, R2, and Chatterbox credentials.

## Database

Generate Prisma and sync the local database:

```bash
npx prisma generate
npx prisma db push
```

System voices can be seeded from `scripts/system-voices`, but that seed uploads
audio to R2 and therefore needs real R2 credentials.

## Development

Run the app locally:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3230
```

Useful checks:

```bash
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Verification Snapshot

Verified locally on 2026-05-29:

- `npm audit --audit-level=moderate` found 0 vulnerabilities.
- `npx prisma db push` synced the local `resonance_dev` schema.
- `npm run lint` completed with 0 errors and 3 existing warnings.
- `npm run build` completed successfully on Next.js 16.2.6.
- Browser verification passed for `/`, `/voices`, and `/text-to-speech` with no console errors or warnings after reload.

Screenshots:

- [Dashboard](docs/screenshots/dashboard-local.png)
- [Voices](docs/screenshots/voices-local.png)
- [Text to Speech](docs/screenshots/text-to-speech-local.png)

## Notes

- Local demo auth creates a deterministic local user and organization so the
  protected dashboard can be verified without Clerk credentials.
- Speech generation, custom voice uploads, billing checkout, portal sessions,
  and audio playback require real external service credentials.
- `postinstall` runs `prisma generate`, so `DATABASE_URL` must be available
  before installing in a fresh environment.
