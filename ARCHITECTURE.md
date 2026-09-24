# KyroPad Website — Architecture

> **Version:** 1.0.0
> **Stack:** Laravel 13 + Inertia.js (React + TypeScript) + MySQL
> **Deployment:** Render (PHP/Nixpacks)

---

## Overview

The KyroPad website is a **modular monolith** built with Laravel as the backend and Inertia.js bridging to a React TypeScript frontend. There is no separate API — Inertia renders React pages server-side via Laravel controllers.

---

## Layered Architecture

```
Browser (React + Inertia)
        ↓
Controller Layer       — thin, delegates to services
        ↓
Service Layer          — business rules and orchestration
        ↓
Repository Layer       — Eloquent queries only
        ↓
MySQL Database
```

### Rules
- Controllers never contain business logic
- Services never query the database directly
- Repositories never contain business logic
- Models only define relationships, fillable, and casts

---

## Module Breakdown

### Public Module
- Route: `GET /`
- Controller: `Public/LandingController`
- Service: `ReleaseService` (provides latest release data for CTAs)
- Page: `Pages/Landing.tsx`

### Download Tracking Module
- Route: `POST /track`
- Controller: `Admin/DownloadController@track`
- Service: `DownloadService`
- Repository: `DownloadRepository`
- Model: `DownloadEvent`

### Admin Module
All routes are behind `auth` + `verified` middleware.

| Route | Controller | Service |
|---|---|---|
| `GET /admin` | `DashboardController@index` | Download + Release + Revenue |
| `GET /admin/downloads` | `DownloadController@index` | DownloadService |
| `GET /admin/releases` | `ReleaseController@index` | ReleaseService |
| `POST /admin/releases` | `ReleaseController@store` | ReleaseService |
| `GET /admin/revenue` | `RevenueController@index` | RevenueService |
| `POST /admin/revenue` | `RevenueController@store` | RevenueService + EmailService |

---

## Database Schema

### `users`
Standard Laravel users table. Single admin user seeded from `.env`.

### `releases`
| Column | Type | Notes |
|---|---|---|
| version | varchar(20) | e.g. `1.2.0` |
| platform | enum | `windows`, `ios`, `android` |
| release_notes | text | |
| download_url | varchar(500) | GitHub Releases URL |
| is_latest | boolean | Only one per platform |
| published_at | timestamp | nullable |

### `download_events`
| Column | Type | Notes |
|---|---|---|
| platform | enum | `windows`, `ios`, `android`, `apk` |
| release_id | FK | nullable |
| ip_hash | varchar(64) | SHA-256 hashed, privacy-safe |
| user_agent | varchar(300) | |
| downloaded_at | timestamp | |

### `revenue_entries`
| Column | Type | Notes |
|---|---|---|
| source | enum | `ios_iap`, `android_iap`, `manual` |
| amount_usd | decimal(10,2) | |
| transaction_ref | varchar(200) | nullable, store transaction ID |
| note | text | nullable |
| recorded_at | timestamp | |

---

## Frontend Architecture

### Pages (Inertia)
Each page receives typed props from its Laravel controller via `Inertia::render()`.

```
Landing.tsx          ← public homepage
Auth/Login.tsx       ← Breeze login (cyberpunk restyled)
Admin/Dashboard.tsx  ← stats overview
Admin/Downloads.tsx  ← download analytics
Admin/Releases.tsx   ← release management
Admin/Revenue.tsx    ← revenue tracking
```

### Component Hierarchy
```
Layouts/
  PublicLayout     → wraps landing page (dark bg, Head meta)
  AdminLayout      → wraps all admin pages (sidebar + header)

Components/shared/ → used by both landing and admin
Components/landing/ → landing page sections only
Components/admin/  → admin panel components only
```

### Design System
- **Background:** `#0d0d0d`
- **Cards:** `#161926` glassmorphic
- **Accent:** `#00e5ff` electric cyan
- **Font (headings):** Space Grotesk
- **Font (body):** Inter
- All tokens defined as `kyro.*` in `tailwind.config.js`
- CSS variables defined in `resources/css/app.css`

---

## Authentication

Uses **Laravel Breeze** with cookie-based sessions. The single admin user is seeded via `AdminSeeder` which reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`. No public registration is possible.

---

## Email

`EmailService` wraps Laravel's `Mail` facade configured for **Brevo SMTP**. Used for:
- Admin notification on new revenue entry
- Download milestone alerts

---

## Deployment

Deployed on **Render** as a PHP Web Service using Nixpacks auto-detection. See `render.yaml` for full IaC configuration. Database is an external managed MySQL (configure credentials via Render environment variables).
