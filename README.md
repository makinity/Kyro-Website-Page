# KyroPad Website & Admin Panel

> Official website and admin dashboard for [KyroPad](https://kyropad.com) — the precision wireless trackpad, macro deck, and live screen mirror for Windows 11.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 (PHP 8.4) |
| Frontend | Inertia.js + React + TypeScript |
| Auth | Laravel Breeze |
| Styling | Tailwind CSS (cyberpunk theme) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Database | MySQL |
| Email | Brevo (SMTP) |
| Deployment | Render (PHP/Nixpacks) |

---

## Local Development Setup

### Prerequisites
- PHP 8.3+
- Composer
- Node.js 18+
- MySQL

### 1. Clone and install

```bash
git clone <repo-url>
cd kyropad-website

composer install
npm install --legacy-peer-deps
```

### 2. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env`:
- Set your MySQL credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)
- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the admin seeder
- Set Brevo SMTP credentials when ready

### 3. Create database & migrate

```bash
# Create the database first in MySQL:
# CREATE DATABASE kyropad_website;

php artisan migrate
php artisan db:seed
```

### 4. Run dev servers

```bash
# Terminal 1 — PHP server
php artisan serve

# Terminal 2 — Vite asset bundler
npm run dev
```

Visit `http://localhost:8000`

Admin panel: `http://localhost:8000/admin` (login with your seeded credentials)

---

## Build for Production

```bash
npm run build
php artisan config:cache
php artisan route:cache
```

---

## Deployment on Render

The `render.yaml` at the project root defines the full service configuration.

1. Push to GitHub
2. Connect the repo in [Render Dashboard](https://dashboard.render.com)
3. Render auto-detects PHP via Nixpacks
4. Set the `sync: false` environment variables manually in the Render dashboard:
   - `APP_URL`
   - `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - `MAIL_USERNAME`, `MAIL_PASSWORD`
5. Deploy — Render runs `composer install && npm run build && php artisan migrate`

---

## Project Structure

```
app/
  Http/Controllers/
    Public/LandingController.php
    Admin/{Dashboard,Download,Release,Revenue}Controller.php
  Services/           # Business logic
  Repositories/       # DB queries only
  Models/

resources/js/
  Pages/
    Landing.tsx
    Auth/Login.tsx
    Admin/{Dashboard,Downloads,Releases,Revenue}.tsx
  Components/
    shared/           # AppButton, AppCard, GlowBadge, etc.
    landing/          # Hero, Features, Pricing, FAQ, etc.
    admin/            # Sidebar, Charts, Forms
  Layouts/
    PublicLayout.tsx
    AdminLayout.tsx

routes/
  web.php             # Public routes
  admin.php           # Auth-guarded admin routes
```

---

## License

MIT — See [LICENSE](LICENSE)
