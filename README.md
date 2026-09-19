# Anime Azərbaycan

Azərbaycandilli anime fanlarını bir platformada birləşdirən community layihəsi.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · React Hook Form + Zod ·
Zustand · TanStack Query · lucide-react · sonner

## Başlamaq

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Struktur

```
app/
  page.tsx                 → Homepage
  anime/page.tsx            → Kataloq
  anime/[slug]/page.tsx     → Anime detalı
  auth/login, auth/register → Authentication
  profile/page.tsx          → Profil (favorites + watchlist)
  api/*                     → Mock backend (route handlers)
components/
  ui/        → Button, Input, Select, Badge, Modal, Skeleton, Pagination
  anime/     → AnimeCard, AnimeGrid, RatingStars, GenreFilter, AnimeHero, FavoriteButton, WatchlistButton
  comment/   → CommentList, CommentItem, CommentForm
  layout/    → Navbar, Footer
  auth/      → LoginForm, RegisterForm, ProtectedRoute
lib/
  apiClient.ts, services/*  → tipli API çağırışları
  schemas/*                 → Zod schema-ları
  server/*                  → mock backend (in-memory db, JWT, helper-lər)
hooks/       → TanStack Query hook-ları
store/       → Zustand auth store
types/       → domain tipləri
```

