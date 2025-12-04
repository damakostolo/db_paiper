# Frontend (Next.js)

A minimal Next.js client to interact with the NestJS API. It provides basic forms to add products, materials, warehouses, manage stock, and create production plans while consuming the secure API.

## Scripts
- `npm install`
- `npm run dev`

## Environment
- `NEXT_PUBLIC_API_BASE_URL` — URL of the NestJS API (default `http://localhost:3001`)

## Features
- Add new products with name and unit
- Add materials and warehouses
- Manage inventory balances per warehouse/material
- Create production plans with optional quarter, description, and line items
- View lists of products, plans, materials, warehouses, and inventory snapshots
