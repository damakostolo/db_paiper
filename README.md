# Secure Production Planning Stack

This repository starts the foundation for a secure production-planning application centered on a PostgreSQL database accessed via Prisma. Service scaffolds are provided for a NestJS backend and Next.js frontend.

## Database
- Prisma schema defined in `prisma/schema.prisma` targeting PostgreSQL.
- Example environment file `.env.example` documents required secrets/connection strings.
- Models include production plans, products, materials, consumption norms, warehouses, and inventory with integrity checks and unique constraints.

## Next steps
1. Create a real `.env` (never commit secrets) and run `prisma migrate dev` after installing Prisma dependencies.
2. Scaffold NestJS backend in `backend/` and wire it to Prisma client with robust auth/validation.
3. Scaffold Next.js frontend in `frontend/` to consume the API with minimal UI but secure defaults.

## Security considerations
- Use role-based access control and JWTs for API access.
- Enforce parameter validation server-side and client-side.
- Apply least-privilege DB roles and rotate credentials regularly.
- Enable TLS for all external connections and set strict CSP/headers at the edge.
