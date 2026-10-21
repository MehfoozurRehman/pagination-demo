# Infinite Scrolling & Pagination Demo

A small full-stack demo of offset-style pagination and infinite scroll, with a Hono API serving generated user records to a React client.

**Status:** Working demo. The API and client run end to end and show page buttons, a page-size selector and infinite scroll together, but it is a local demo with no deployment, no tests, and several known bugs listed below.

## The problem

Long lists of records cannot be sent to the browser in one response. The demo explores two ways of loading them in chunks: numbered pages through an API, and a scroll container that fetches the next page as the user reaches the bottom.

## What it does

- **Paginated API** (`server/src/index.ts`): `GET /?page=&limit=` returns one slice of 1,000 generated users (`id`, `name`, `email`, `picture`) plus `totalPages`.
- **Generated data**: the records are created at server start with `@faker-js/faker`, so they change on every restart.
- **Page navigation**: prev/next buttons and a window of five numbered page buttons around the current page.
- **Infinite scroll**: a fixed-height scroll container fetches the next page when it reaches the bottom and appends the results.
- **Cached fetching**: `client/hooks/useQuery.jsx` wraps SWR with `keepPreviousData` and `suspense` enabled.

## How it's built

- **Backend**: Hono on Node via `@hono/node-server`, with the `cors` and `logger` middleware. It runs with `tsx watch` in development.
- **Frontend**: React 18 with Vite 5 and the ESLint setup in `client/package.json`. `main.jsx` wraps `App` in an error boundary (`Error.jsx`) and in `React.StrictMode`.
- **Data flow**: the client builds a URL from `page` and `limit` state and passes it to `useQuery`. SWR caches each page by URL. `App.jsx` copies each new page into a `completeData` array, which the app renders as JSON.
- **Decision to note**: pagination is computed by `slice` over an in-memory array, which keeps the server trivial. It is offset pagination, not cursor pagination, so it would not stay stable under inserts on a real dataset.

## Running it locally

Start the API first, then the client, each in its own terminal.

```bash
cd server && npm install && npm run dev    # API on http://localhost:3000
cd client && npm install && npm run dev    # client on http://localhost:5173
```

Other client scripts: `npm run build`, `npm run preview`, `npm run lint`.

## What's left

- The client hardcodes `http://localhost:3000` in `App.jsx`, so it cannot point at another API without editing code.
- Page buttons and infinite scroll share one `completeData` array that is never reset, so switching pages by button appends records instead of replacing them.
- The scroll listener is removed with a new anonymous function, so the original listener is never detached.
- The page-size `<select>` labels do not match its values: the option with value `5` is labelled `50`.
- Limit is stored as a string from the select, and the server takes `limit` as given without bounds checks.
- The fallback `totalPages = 50` in `App.jsx` is a guess, not a value from the API.
- No automated tests. The client has a `lint` script and an ESLint config, but nothing runs it in CI.

## Author

Created by [Mehfooz-ur-Rehman](https://github.com/MehfoozurRehman).
