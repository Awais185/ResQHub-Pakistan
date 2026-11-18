# ResQHub Pakistan — Full-Stack Next.js

Disaster management & humanitarian coordination platform. **Lahore District pilot.**

## Requirements
- Node.js 18+
- npm

## Quick Start (Windows / Mac / Linux)

```bash
npm install
npm run dev
```

That's it. The `predev` hook initializes the SQLite database and seeds demo data automatically on the first run.

Open http://localhost:3000

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@resqhub.pk | admin123 |
| Citizen | citizen@resqhub.pk | citizen123 |
| Volunteer | volunteer@resqhub.pk | volunteer123 |
| NGO | ngo@resqhub.pk | ngo123 |

## Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes (Node runtime)
- **Database:** SQLite via Prisma ORM
- **Auth:** bcrypt-hashed passwords + JWT sessions in httpOnly cookies
- **Maps:** Leaflet + OpenStreetMap
- **Charts:** Recharts
- **Icons:** Lucide

## Pages Implemented

**Public**
- `/` — Landing page (animated workflow, features, how-it-works, footer)
- `/login` — Split-screen login
- `/register` — Registration

**Protected (all roles)**
- `/dashboard` — Role-aware dashboard (stats, alerts, map)
- `/alerts` — Emergency alerts feed
- `/report` — 3-step disaster report form with map picker → **saves to DB**
- `/my-reports` — User's submitted reports with verification status
- `/verified-hub` — Verified data hub (searchable, from DB)
- `/needs` — Aggregated needs (computed from verified reports)
- `/ngo` — NGO list + **aid commitment workflow** (COMMITTED → DISPATCHED → DELIVERED)
- `/map` — Full interactive disaster map
- `/profile` — User profile

**Admin-only**
- `/admin` — Overview stats (live from DB) + chart + recent activity
- `/admin/alerts` — Create/archive alerts
- `/admin/reports` — **Verify/reject reports** (unlocks needs dashboard)
- `/admin/users` — All users list
- `/admin/ngos` — Verify organizations

## End-to-End Workflow Test

1. Login as **citizen@resqhub.pk** → Submit a disaster report at `/report`
2. Login as **admin@resqhub.pk** → Go to `/admin/reports` → Click **Verify**
3. Login as **ngo@resqhub.pk** or citizen → Go to `/ngo` → **Commit Aid**
4. From the commitment card → **Mark Dispatched** → **Mark Delivered**
5. Login as admin → `/admin` → See updated stats

## API Routes

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/alerts` | List / create alert |
| PATCH | `/api/alerts/[id]` | Update alert (admin) |
| GET/POST | `/api/reports` | List / create report |
| PATCH | `/api/reports/[id]` | Verify / reject (admin) |
| GET | `/api/needs` | Aggregated needs |
| GET | `/api/ngos` | List organizations |
| PATCH | `/api/ngos/[id]` | Verify org (admin) |
| GET/POST | `/api/aid` | List / create commitment |
| PATCH | `/api/aid/[id]` | Update status |
| GET | `/api/map` | Map markers |
| GET | `/api/admin/stats` | Platform stats |
| GET | `/api/admin/users` | User list (admin) |

## Security

- Passwords hashed with **bcryptjs** (10 rounds)
- Sessions: **JWT** signed with `JWT_SECRET` in httpOnly cookie (7-day expiry)
- Middleware protects all dashboard routes; `/admin/*` requires ADMIN role
- Role-based checks **on every mutating API** (not just frontend)
- Reports are user-scoped when queried via `?mine=1`
- No private household data exposed on public map (only locality-level markers)

## AI Features

Not implemented in this demo (no API provider configured). The architecture supports adding them — add a `/api/ai/*` route that calls your chosen provider with the key kept in `.env`. Follow the safeguards in the master prompt: AI suggestions must be labeled as suggestions and require human verification before becoming facts.

## Environment Variables

See `.env.example`:
- `DATABASE_URL` — SQLite path (default `file:./dev.db`)
- `JWT_SECRET` — **Change this in production** (min 32 chars)

## Useful Scripts

```bash
npm run dev          # start dev server (auto-inits DB on first run)
npm run build        # production build
npm run setup        # manual DB init + seed
npm run db:studio    # open Prisma Studio (view/edit data)
npm run db:push      # sync schema to DB
npm run db:seed      # re-run seed
```

## Notes

- All operational data is labeled **DEMO DATA**
- **Lahore District pilot** — no other districts (no Sheikhupura, Kasur, etc.)
- **No Pakistan flag imagery** anywhere in the UI
- Original-style ResQHub logo (recreated as SVG)
- Contact: [WhatsApp](https://wa.me/923044335771) · [Email](mailto:mazisial9296@gmail.com)

## Known Limitations

- SQLite (fine for demo; switch to PostgreSQL for production by editing `prisma/schema.prisma`)
- No file upload (report evidence is a future feature)
- No email provider (registration is immediate; no email verification)
- No AI integration (architecture ready, needs API key)
- Forgot-password link is a placeholder
