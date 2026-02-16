# Velvet Rinse - Premium Laundry Web App

Production-ready React + Vite laundry service app with customer tracking and protected staff dashboard.

## Features
- React + Vite + React Router routes (`/`, `/staff`)
- Firebase Firestore realtime receipts (`onSnapshot`)
- Customer order status check by numeric receipt ID
- Service pricing table + live estimate calculator
- Locations with map links
- Reviews section
- WhatsApp delivery request CTA
- Staff login, create/update/delete receipt flow
- Arabic/English toggle with RTL support
- Purple premium UI system with responsive layout
- SEO metadata (title, description, Open Graph, Twitter)
- Netlify SPA support via `public/_redirects`

## Project Structure
```text
.
|- public/
|  |- _redirects
|  |- social-preview.svg
|- src/
|  |- components/
|  |  |- home/
|  |  |- layout/
|  |  |- staff/
|  |- context/
|  |- data/
|  |- hooks/
|  |- pages/
|  |- services/
|  |- styles/
|  |- App.jsx
|  |- main.jsx
|- .env.example
|- index.html
|- netlify.toml
|- package.json
|- vite.config.js
```

## Setup
1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
- Copy `.env.example` to `.env`
- Fill all `VITE_FIREBASE_*` values from your Firebase project settings
- Create Firestore collection: `receipts`
- Receipt document fields used by app:
  - `id` (string)
  - `name` (string)
  - `status` (`"ready"` or `"not_ready"`)
  - `createdAtMs` (number)

3. Run dev server:
```bash
npm run dev
```

4. Build production:
```bash
npm run build
```

## Brand Configuration
Edit `src/data/siteConfig.js`:
- `brandName`
- `poweredByName`
- `whatsappNumber`
- Contact info
- Services, locations, reviews
- Staff login defaults (`staffAuth`)

## Staff Access
- Route: `/staff`
- Simple login credentials from `src/data/siteConfig.js`
- Auth state stored in localStorage key: `laundry-staff-auth`

## Netlify Deployment Notes
- `public/_redirects` includes:
```text
/* /index.html 200
```
- This ensures direct route loads (like `/staff`) work after deploy.
- `netlify.toml` is included with build/publish defaults.

## Social Preview Cache Refresh
After changing social meta or preview image:
1. Redeploy site.
2. Re-scrape URL in sharing debuggers:
   - Facebook Sharing Debugger
   - X Card Validator
3. If old preview persists, append a version query to image URL (e.g. `/social-preview.svg?v=2`).