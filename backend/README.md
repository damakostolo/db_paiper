# Backend (NestJS + Prisma)

A minimal NestJS API that exposes read/write access to the PostgreSQL schema in `../prisma/schema.prisma`. It uses Prisma for persistence, class-validator pipes for payload validation, and Helmet for baseline security headers.

## Scripts
- `npm install`
- `npm run start:dev` (uses `ts-node`)

## Environment
- `DATABASE_URL` — PostgreSQL connection string
- `PORT` (optional) — port for the API, defaults to `3001`

## Available routes
- `GET /products` — list products
- `GET /products/:id` — fetch a product by id
- `POST /products` — create a product `{ Name, Unit }`
- `DELETE /products/:id` — delete a product
- `GET /plans` — list production plans with items
- `GET /plans/:id` — fetch plan with items
- `POST /plans` — create plan `{ year, quarter?, description?, items: [{ productId, quantity }] }`

All routes are ready for further hardening (JWT, RBAC, audit logging). Add guards/interceptors as needed for your deployment.
