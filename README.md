# High-Performance Infinite Scrolling & Pagination Demo

A full-stack demonstration of cursor-based pagination, page indexing, and infinite scroll data fetching built with Hono (Node.js), TypeScript, React 18, Vite 5, and SWR.

## Overview

`pagination-demo` showcases best practices for paginated API design:
- **Backend API (`/server`)**: Ultra-fast [Hono](https://hono.dev/) server generating synthetic paginated datasets with `@faker-js/faker`.
- **Frontend Client (`/client`)**: React 18 & Vite single-page application utilizing SWR (`swr`) for stale-while-revalidate caching and cursor pagination.

## Tech Stack

- **Backend**: Node.js, [Hono](https://hono.dev/), TypeScript, `tsx`, `@faker-js/faker`
- **Frontend**: React 18, [Vite](https://vitejs.dev/) (v5), SWR

## Prerequisites

- Node.js (v18 or higher recommended)
- Package manager (`npm` or `pnpm`)

## Getting Started

### 1. Start Hono Backend API

1. Navigate to `/server` and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Run the Hono server:
   ```bash
   npm run dev
   ```

### 2. Start Frontend Client

1. In a new terminal, navigate to `/client` and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Run the Vite development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your web browser.

## Available Scripts

### Backend (`/server`)
- `npm run dev` - Runs the Hono server with live reload via `tsx watch`.

### Frontend (`/client`)
- `npm run dev` - Starts the Vite dev server with instant HMR.
- `npm run build` - Compiles production assets.
- `npm run preview` - Previews production build locally.

## Author

Created by [Mehfooz-ur-Rehman](https://github.com/MehfoozurRehman).
