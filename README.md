# DMS Portal (React + Vite + Tailwind CSS)

Delivery Management System (DMS) portal built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. The app uses a configurable API base URL and a public application configuration for branding and UI toggles.

## Tech Stack

- React 19, React Router 7
- TypeScript 5
- Vite 6
- Tailwind CSS 4
- Axios for HTTP, Zod for validation, ApexCharts for charts

## Requirements

- Node.js 18+ (20+ recommended)
- npm or yarn

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Create a `.env` file (optional if you keep the default API URL):

   ```bash
   # .env
   VITE_API_BASE_URL=http://api-dms.orienteed.ps/v1/web
   ```

   - The app falls back to `http://api-dms.orienteed.ps/v1/web` when `VITE_API_BASE_URL` is not set.

3. Start the dev server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Preview production build locally:

   ```bash
   npm run preview
   ```

## Configuration

- **Environment variable**
  - `VITE_API_BASE_URL`: Configures the Axios client base URL used by `src/config/api.ts`.

- **Public app config** (`public/app-config.json`)
  - Branding: names and logos
  - Feature toggles: theme toggle, analytics, notifications, language switcher
  - Social and store links
  - Branch contact cards

  Update the JSON as needed; it is served statically at runtime.

## Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Lint the project

## Project Notes

- SVGs are imported as React components via the SVGR plugin configured in `vite.config.ts`.
- Axios instance is defined in `src/config/api.ts` with interceptors for auth token and basic retry handling.
- Static assets and configuration are served from `public/` and copied to `dist/` during build.

## License

MIT
