# DesignMantic Clone

A pixel-perfect, fully functional React clone of the DesignMantic graphic design software and logo maker platform.

## Run & Operate

- `pnpm --filter @workspace/designmantic run dev` — run the frontend (auto-assigned port)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18, React Router v6, Tailwind CSS, Vite
- UI: shadcn/ui components (Radix UI), lucide-react icons
- State: React Context API + module-level event emitter for modals
- API: Express 5 (api-server artifact)
- DB: PostgreSQL + Drizzle ORM (unused in this frontend-only app)

## Where things live

- `artifacts/designmantic/src/App.tsx` — router setup (React Router v6 BrowserRouter)
- `artifacts/designmantic/src/index.css` — global theme (Inter font, crimson #c61e53 palette)
- `artifacts/designmantic/src/pages/` — HomePage, LogoMakerPage, WebsiteTemplatesPage, PricingPage, CustomDesignPage
- `artifacts/designmantic/src/components/Layout/` — Header (2-level sticky nav) and Footer (4-column dark)
- `artifacts/designmantic/src/components/modals/` — Login, SignUp, Video, LogoEditor, Checkout, TemplatePreview, Success modals
- `artifacts/designmantic/src/lib/modalEvents.ts` — module-level event emitter for modal communication
- `artifacts/designmantic/src/hooks/useModal.ts` — custom useModal(name) hook
- `artifacts/designmantic/src/hooks/useWindowHandle.ts` — manages window.open() with named windows
- `artifacts/designmantic/src/contexts/AppContext.tsx` — auth, cart, favorites context

## Architecture decisions

- React Router v6 (not wouter) — user requirement for Selenium compatibility
- Native `<select>` elements (not Radix UI Select) for all filter dropdowns — required for Selenium's Select class
- Module-level event emitter pattern for modal state — avoids prop drilling and allows any component to trigger modals
- `window.open()` with named window references via `useWindowHandle` hook — tracks open windows and focuses existing ones
- All interactive elements have `data-testid`, `id`, `name`, and `<label>` for Selenium/accessibility

## Product

Multi-page DesignMantic clone:
- **Homepage** — hero with search, trusted-by strip, service tabs, template cards, custom design section, testimonials carousel
- **Logo Maker** (`/logo-maker`) — searchable logo grid, industry/style/color filters, fullscreen logo editor modal with live SVG preview
- **Website Templates** (`/website/templates`) — filterable template grid with preview modal
- **Pricing** (`/website/pricing`) — monthly/annual billing toggle, 3-plan comparison cards
- **Custom Design** (`/services/custom`) — service tiles grid + contact form with validation
- **7 modal types** — Login, Sign Up, Video, Logo Editor, Checkout, Template Preview, Success

## User preferences

- Primary color: #c61e53 (hot pink/crimson)
- Font: Inter (Google Fonts)
- NO social media icons or handles anywhere in the app
- All dropdowns must be native `<select>` tags for Selenium compatibility
- Every interactive element needs `data-testid` attributes

## Gotchas

- Google Fonts @import MUST be the very first line in index.css (before @import "tailwindcss")
- React Router v6 future flag warnings in console are benign (not errors)
- Do not replace native `<select>` elements with Radix UI Select — breaks Selenium compatibility

## Pointers

- See the `pnpm-workspace` skill for workspace structure and TypeScript setup
- See the `react-vite` skill for frontend build conventions
