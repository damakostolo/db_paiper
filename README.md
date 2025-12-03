# Secure Production Planning Stack

This repository delivers a secure-first production-planning stack with a PostgreSQL database accessed via Prisma, a NestJS API, and a minimal Next.js client.

## Database
- Prisma schema defined in `backend/prisma/schema.prisma` targeting PostgreSQL.
- Example environment file `.env.example` documents required secrets/connection strings.
- Models include production plans, products, materials, consumption norms, warehouses, and inventory with integrity checks and unique constraints.

## Backend (NestJS)
- Location: `backend/`
- Run: `npm install` then `npm run start:dev`
- Environment: `DATABASE_URL` (required), `PORT` (default 3001)
- Security: Helmet enabled, Zod validation via global pipes. Extend with JWT/RBAC guards for production.
- Routes: `/products`, `/plans`, `/materials`, `/warehouses`, `/inventory` (create/list/read and stock upsert).

## Frontend (Next.js)
- Location: `frontend/`
- Run: `npm install` then `npm run dev`
- Environment: `NEXT_PUBLIC_API_BASE_URL` pointing to the NestJS server (defaults to http://localhost:3001)
- UI: Basic forms to add products, materials, warehouses, manage stock, and create production plans; lists all records.

## Security considerations
- Use role-based access control and JWTs for API access.
- Enforce parameter validation server-side and client-side.
- Apply least-privilege DB roles and rotate credentials regularly.
- Enable TLS for all external connections and set strict CSP/headers at the edge.
