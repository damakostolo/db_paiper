# Backend (NestJS)

This placeholder directory is intended for the NestJS API gateway. The API should expose secure REST endpoints backed by the Prisma schema in `../prisma/schema.prisma` and enforce authentication/authorization using JWTs and role-based access control.

Recommended next steps:
- Initialize a NestJS project (`nest new backend`) with TypeScript strict mode.
- Add `@nestjs/config`, `@nestjs/passport`, `passport-jwt`, and `@nestjs/jwt` for secure auth.
- Use `PrismaModule` with generated client to access PostgreSQL.
- Implement validation with `class-validator`/`class-transformer` and centralized exception filters.
