# Frontend (Next.js)

This placeholder directory is intended for a minimal Next.js client that consumes the secured API. Keep styling minimal (e.g., basic CSS/Chakra/Tailwind) and prioritize security features:
- Client-side form validation before requests.
- Strict Content Security Policy and secure cookies for JWTs (HTTP-only, SameSite=Lax or Strict).
- Avoid exposing secrets; load API base URL from environment variables.
