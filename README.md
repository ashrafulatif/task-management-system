# Task Management System (Backend API)

A simple **Task Management** REST API built with **Express + TypeScript** and **Prisma (PostgreSQL)**.  
It includes **JWT-based authentication**, **role-based route protection**, and **task CRUD** with **search, filtering, pagination, and sorting**.

---

## Features

### Authentication
- Register a new user
- Login user and issue an **access token**
- Stores access token in an **HTTP-only cookie** (`accessToken`)
- Role stored in token and used for authorization

### Task Module
- Create task (must be authenticated)
- Get **my tasks** (supports pagination, sorting, search, status filtering)
- Get task by id (only owner can access)
- Update task (only owner can update)
- Delete task (only owner can delete)

### Other
- Centralized response formatter
- Global error handler (Prisma + Zod + generic errors)
- `notFound` handler for unknown routes
- Vercel serverless configuration included (`vercel.json`)

---

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Database**: PostgreSQL
- **ORM**: Prisma (schema folder mode)
- **Auth**: JSON Web Token (JWT) + Cookies
- **Validation**: Zod
- **Build tool**: `tsup`
- **Package manager**: `pnpm` (lockfile included)

---

## Project Structure (High Level)

```txt
src/
  app.ts                 # Express app setup (cors, parsers, routes, errors)
  server.ts              # DB connect + start server
  config/                # env config loader
  lib/                   # prisma client
  middlewares/           # auth, validateRequest, error handlers
  modules/
    Auth/                # auth controller/service/route/validation
    Task/                # task controller/service/route
  routes/                # index router (/auth, /tasks)
  shared/                # catchAsync, sendResponse
  utils/                 # jwt, token cookie helper, pagination helper, cookie helper
prisma/
  schema/                # prisma models/enums (folder mode)
  migrations/            # prisma migrations (if generated)
generated/
  prisma/                # generated prisma client output
```

---

## Getting Started (Local Development)

### 1) Prerequisites
- Node.js (recommended **Node 20+** because the build targets `node20`)
- PostgreSQL database
- pnpm installed

### 2) Clone and install
```bash
git clone https://github.com/ashrafulatif/task-management-system.git
cd task-management-system
pnpm install
```

### 3) Environment Variables
Create a `.env` file at the project root (you can copy from `.env.example`).

```env
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
NODE_ENV=development

ACCESS_TOKEN_SECRET="your_super_secret_key"
ACCESS_TOKEN_EXPIRES_IN="1d"

# Optional (used by CORS in src/app.ts and config)
APP_URL="http://localhost:3000"
PROD_APP_URL=""
```
---

## Database & Prisma

This project uses Prisma with a **schema folder** (`prisma/schema`) and a Prisma config file (`prisma.config.ts`).

### Prisma config
- Schema directory: `prisma/schema`
- Migrations path: `prisma/migrations`
- Datasource URL: `DATABASE_URL`

### Common Prisma commands
> If you don’t already have migrations, start by creating them.

```bash
# Generate Prisma client
pnpm prisma generate

# Create a migration (first time / when schema changes)
pnpm prisma migrate dev --name init

# Apply migrations (prod-like)
pnpm prisma migrate deploy

# Open Prisma Studio
pnpm prisma studio
```

---

## Running the Server

### Development
```bash
pnpm dev
```
Runs:
- `npx tsx watch ./src/server.ts`

### Build (for deployment)
```bash
pnpm build
```

### Start (after build)
```bash
pnpm start
```

---

## API Base URL

By default (local):  
- `http://localhost:<PORT>/api/v1`

Root health/info:
- `GET /` → `"Root endpoint for Task Management API"`

---

## Authentication

### How auth works
- On `POST /auth/login`, the API:
  - validates credentials
  - creates a JWT access token
  - **sets it in an HTTP-only cookie**: `accessToken`
  - also returns the token in JSON response `data.accessToken`

### Roles
Prisma enum: `Role`  
App enum: `UserRole`
- `ADMIN`
- `USER`

Protected routes check the role via middleware.

---

## API Endpoints

### Auth
#### Register
`POST /api/v1/auth/register`

Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login
`POST /api/v1/auth/login`

Body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response includes an access token and user info; token is also stored in cookie.

---

### Tasks (Protected)
All routes require auth cookie `accessToken`.

#### Create Task
`POST /api/v1/tasks/add-task`

Body example:
```json
{
  "title": "Finish assignment",
  "description": "Complete Prisma + Express module",
  "dueDate": "2026-12-31T23:59:59.000Z",
  "status": "PENDING"
}
```

Notes:
- `dueDate` must be a **future date**, otherwise the API throws an error.

#### Get My Tasks (with pagination/filter/search/sort)
`GET /api/v1/tasks/my-tasks`

Query params:
- `page` (default: `1`)
- `limit` (default: `10`)
- `sortBy` (default: `createdAt`)  
  Allowed: `createdAt | updatedAt | dueDate | title | status`
- `sortOrder` (`asc` or `desc`, default: `desc`)
- `search` (string; searches `title` and `description`)
- `status` (string; e.g. `pending`, `completed`, etc. converted to uppercase)

Example:
```txt
GET /api/v1/tasks/my-tasks?page=1&limit=10&sortBy=dueDate&sortOrder=asc&search=assignment&status=pending
```

#### Get Task by ID
`GET /api/v1/tasks/:id`

Only the owner can access.

#### Update Task
`PUT /api/v1/tasks/:id`

Only the owner can update.  
If updating `dueDate`, it must be a future date.

#### Delete Task
`DELETE /api/v1/tasks/:id`

Only the owner can delete.

---

## Response Format

Success responses generally follow:

```json
{
  "success": true,
  "message": "....",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

Errors (from global error handler) generally follow:

```json
{
  "success": false,
  "message": "Error message",
  "error": {}
}
```

---

## Deployment (Vercel)

A `vercel.json` is included and points to:

- Build source: `api/server.mjs`
- Runtime: `@vercel/node`
- All routes forwarded to `/api/server.mjs`

Typical flow:
1. Run `pnpm build` (outputs server to `api/`)
2. Deploy to Vercel

---

## Known Notes / Limitations

- Cookie settings are strict (`secure: true`, `sameSite: "none"`).  
  For local development on plain HTTP, browsers may not store the cookie.
- Task validation schema file exists but is not implemented (`src/modules/Task/task.validation.ts`).
- `tsconfig.json` includes Next.js settings (likely copied from a Next setup) even though this is an Express API; it doesn’t break runtime but may be unnecessary.

---

## License
ISC