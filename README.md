# Recettes — Cuisine & partage

A full-stack recipe website focused on Algerian and Mediterranean cooking: browse recipes by category, season, and holiday; read news and nutrition content; and manage content through an **admin** area (JWT-protected).

| Layer | Stack | Folder |
|-------|--------|--------|
| **Frontend** | React 19, Vite, React Router | [`frontend/`](frontend/) |
| **Backend** | NestJS 10, TypeORM, MySQL | [`backend/`](backend/) |
| **Database** | MySQL 8 | Schema + seed in [`db/`](db/) |

Static assets (images, uploads) live under [`assets/`](assets/) at the repository root; the API serves them under `/static/…`.

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (comes with Node)
- **Docker** and **Docker Compose** — for local MySQL (recommended), or a MySQL 8 instance you configure yourself

---

## Repository layout

```
.
├── frontend/          # Vite + React SPA (deployable to Vercel)
├── backend/           # NestJS REST API
├── db/                # SQL seed (`seed.sql`)
├── assets/            # Images & user uploads (served as /static/…)
├── docker-compose.yml # Local MySQL 8
└── package.json       # npm workspaces + root scripts
```

This is an **npm workspaces** monorepo. Install dependencies once from the **repository root**.

---

## Quick start (local development)

### 1. Install dependencies

```bash
git clone <repository-url>
cd Recepies-Website
npm install
```

### 2. Start MySQL

Using the bundled Compose file (database `recettes`, root password `root`, port `3306`):

```bash
docker compose up -d
```

Wait until the container is healthy (a few seconds). If port `3306` is already used, stop the other MySQL or change the host mapping in `docker-compose.yml` and adjust `DB_PORT` / `DB_HOST` in your `.env`.

### 3. Configure the API

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set at least:

| Variable | Example (matches this repo’s `docker-compose`) |
|----------|------------------------------------------------|
| `DB_HOST` | `127.0.0.1` |
| `DB_PORT` | `3306` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | `root` |
| `DB_NAME` | `recettes` |
| `JWT_SECRET` | Any long random string in development |

Use **`127.0.0.1`** for `DB_HOST` if Node resolves `localhost` to IPv6 (`::1`) while MySQL listens on IPv4 only.

### 4. Seed the database

The seed script **drops and recreates** tables and loads sample data (French copy, demo recipes).

```bash
npm run db:seed
```

Requires the `mysql` service from `docker compose` to be running.

### 5. Run frontend + backend together

From the **repository root**:

```bash
npm run dev
```

- **Web app:** [http://localhost:5173](http://localhost:5173)  
- **API health:** [http://localhost:3000/api/health](http://localhost:3000/api/health) (expect `{"status":"ok"}`)

The Vite dev server **proxies** `/api` and `/static` to `http://localhost:3000`, so you do **not** need `VITE_API_URL` for local development.

---

## Useful npm scripts (run from repository root)

| Script | What it does |
|--------|----------------|
| `npm run dev` | Starts Nest in watch mode **and** Vite (ports 3000 + 5173) |
| `npm run build` | Production build: backend then frontend |
| `npm run start:api` | Run compiled Nest API (`npm run start:prod -w backend`) |
| `npm run start:web` | Preview the built frontend (`vite preview`) |
| `npm run db:seed` | Apply `db/seed.sql` into MySQL via Docker |

### Run one workspace only

```bash
# API only (watch mode)
npm run start:dev -w backend

# Frontend only (expects API on port 3000 for proxy)
npm run dev -w frontend
```

---

## Frontend environment (`frontend/`)

Copy and adjust if needed:

```bash
cp frontend/.env.example frontend/.env.local
```

| Variable | When to set |
|----------|-------------|
| `VITE_API_URL` | **Production / split deploy:** base URL of your API, **no trailing slash** (e.g. `https://api.example.com`). Leave **unset** locally so Vite’s proxy handles `/api` and `/static`. |

See [`frontend/vercel.json`](frontend/vercel.json) for SPA routing on Vercel.

### Deploying the frontend on Vercel

1. Connect the repo and set **Root Directory** to `frontend`.
2. Framework preset: **Vite**.
3. Add **`VITE_API_URL`** in Vercel project settings with your public API origin.
4. Ensure the **backend** enables CORS for your Vercel domain (`backend` uses `enableCors({ origin: true })` by default — tighten this in production if needed).

---

## Production build (local smoke test)

```bash
npm run build
npm run start:api          # serves API + /static from compiled backend
npm run start:web            # optional: preview built SPA (configure API URL via env)
```

The API serves uploaded/static files from the `assets/` directory resolved relative to the repo (see `backend/src/assets-root.ts`).

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| **Blank recipe sections / errors on home** | API not running — open `/api/health`. MySQL down or wrong `DB_*` in `backend/.env`. |
| **`ECONNREFUSED` on DB** | Start MySQL (`docker compose up -d`) and credentials in `.env`. |
| **Empty lists but API returns 200** | Run `npm run db:seed` after MySQL is up. |
| **Vercel site has no data** | Set `VITE_API_URL` to your deployed API; the static host does not provide `/api` by itself. |
| **Port 3000 already in use** | Stop the other process or set `PORT` in `backend/.env`. |

---

## License

See individual packages if specified; otherwise treat as private / unlicensed unless you add a license file.
