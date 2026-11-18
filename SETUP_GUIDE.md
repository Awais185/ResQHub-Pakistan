 # ResQ Hub Pakistan Setup Guide

This guide covers local development on Windows with PowerShell. The project uses Next.js, Prisma, and a local SQLite database.

## Requirements

- Node.js 18 or newer
- npm
- Windows PowerShell

Check your installed versions:

```powershell
node --version
npm --version
```

## 1. Install dependencies

Open PowerShell in the project directory:

```powershell
Set-Location 'D:\ResQHub\resqhub-next'
npm install
```

If you extracted the project to another directory, substitute that path.

## 2. Configure environment variables

Create a local `.env` file from the example:

```powershell
Copy-Item .env.example .env
```

Generate a signing secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Replace the example `JWT_SECRET` value in `.env` with the generated value. Keep `.env` private and do not commit it. The default database setting uses SQLite at `file:./dev.db`.

## 3. Initialize the database

Run the setup script once for a fresh database:

```powershell
npm run setup
```

This generates the Prisma client, synchronizes the schema to SQLite, and creates the demonstration accounts and sample records. Keep the `.env` and database file in place between runs; do not rerun seeding against a database containing data you need to preserve.

The `npm run dev` command also initializes and seeds the database automatically when `prisma\dev.db` does not exist.

## 4. Start the application

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Stop the development server with `Ctrl+C`.

## Demo accounts

All seeded operational records are demonstration data, not current official disaster information.

| Role | Email | Password |
|---|---|---|
| Administrator | `admin@resqhub.pk` | `admin123` |
| Citizen | `citizen@resqhub.pk` | `citizen123` |
| Volunteer | `volunteer@resqhub.pk` | `volunteer123` |
| NGO coordinator | `ngo@resqhub.pk` | `ngo123` |

Use these accounts only for local demonstration. Replace or remove them and configure a strong `JWT_SECRET` before any non-demo deployment.

## Useful commands

```powershell
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Start the production build
npm run db:push      # Synchronize Prisma schema changes to SQLite
npm run db:seed      # Add demonstration records
npm run db:studio    # Open Prisma Studio
```

The seed command is intended for a fresh demo database. Back up `prisma\dev.db` before database changes.

## Troubleshooting

### Prisma reports a schema validation error

Check that `prisma\schema.prisma` uses valid multi-line `generator` and `datasource` blocks, then run:

```powershell
npx prisma validate
npx prisma generate
```

### The database is missing or out of date

For a new local database, run `npm run setup`. For an existing database, back it up before running:

```powershell
npx prisma db push
```

### Port 3000 is already in use

Stop the other development server, or start Next.js on another port:

```powershell
npm run dev -- --port 3001
```

## Prototype limitations

This project is a Lahore District demonstration prototype. Seeded alerts, reports, locality coordinates, and aid commitments are sample data and must not be interpreted as verified live conditions. File evidence uploads, email/password recovery, and a live AI provider require additional implementation or external service configuration.