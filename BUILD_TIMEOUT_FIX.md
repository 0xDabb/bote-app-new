# Build Timeout Fix - 2 January 2026

## Problem
Build was timing out at `prisma db push` step (16+ minutes).

## Root Cause
- Supabase pooler connection (port 6543) doesn't support schema migrations
- `prisma db push` requires direct connection (port 5432)
- Build was hanging waiting for database connection

## Solution
Removed `prisma db push` from Vercel build command.

**Why it's safe:**
- Database schema already exists (created via Supabase SQL Editor)
- Tables are already in production database
- We only need `prisma generate` to create the client
- Schema changes should be done manually via Supabase dashboard

## Changes
- `vercel.json`: Changed build command from `npm run build:vercel` to `prisma generate && next build`

## Expected Result
- Build time: 16+ minutes → 1-2 minutes
- No database connection during build
- Faster deployments
