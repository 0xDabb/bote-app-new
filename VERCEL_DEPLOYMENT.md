# Vercel Environment Variables Rehberi

Bu değişkenleri Vercel Dashboard'da ayarlayın:
**Project Settings → Environment Variables**

## Gerekli Environment Variables:

### 1. Database (Vercel Postgres'ten otomatik gelecek)
- `DATABASE_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NON_POOLING`

### 2. NextAuth
- `NEXTAUTH_SECRET` - Mevcut değerinizi kullanın
- `NEXTAUTH_URL` - Deploy sonrası: https://your-project.vercel.app

## Adımlar:

1. Vercel'de Postgres database oluşturun
2. Database otomatik olarak environment variables ekleyecek
3. NEXTAUTH_SECRET ve NEXTAUTH_URL'i manuel ekleyin
4. Redeploy edin
