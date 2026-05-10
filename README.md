# AYBU Store

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-private-lightgrey?style=for-the-badge)

## Project Title & Overview

AYBU Store is a Next.js storefront application for Ankara Yildirim Beyazit University merchandise.  
It provides a modern client-rendered shopping interface with home/product discovery, department navigation, cart drawer interaction, design customization flow, and login/register UX backed by strongly typed UI models and mock domain data.

The codebase currently emphasizes frontend architecture quality (modular sections, reusable UI primitives, and custom hooks) and is ready for integration with real backend services.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** React
- **Styling:** Tailwind CSS v4 + PostCSS + Autoprefixer
- **Tooling:** ESLint via `next lint`
- **Data Layer (current):** In-repo typed mock data (`src/lib/mockData.ts`)

## Folder Structure

```text
AYBUStore/
|-- app/                                  # Next.js App Router entrypoint
|   |-- layout.tsx                        # Root HTML layout + metadata
|   |-- page.tsx                          # Route entry rendering main storefront feature
|   `-- globals.css                       # Global Tailwind import and base resets
|-- src/
|   |-- components/
|   |   |-- features/
|   |   |   |-- MainStorefrontFeature.tsx # Main orchestrator (state + view composition)
|   |   |   `-- storefront/
|   |   |       |-- sections/             # Large feature sections (header, home, auth, cart, chat, etc.)
|   |   |       |-- hooks/                # Feature-specific behavior hooks
|   |   |       |-- utils/                # Domain helpers (auth validation, currency format)
|   |   |       `-- types.ts              # Feature-level props and state contracts
|   |   `-- ui/                           # Reusable UI primitives and auth composition blocks
|   |-- lib/
|   |   `-- mockData.ts                   # Typed mock content for catalog/nav/auth/footer/chat
|   `-- types/
|       `-- index.ts                      # Shared domain model interfaces
|-- images/                               # Static image assets used directly by client components
|-- public/                               # Reserved public assets directory (currently empty)
|-- _legacy/                              # Legacy static artifacts retained for reference/migration
|   `-- index.html                        # Legacy entry artifact (moved from root)
|-- package.json                          # NPM metadata, dependencies, and scripts
|-- tsconfig.json                         # TypeScript compiler settings (strict, noEmit)
|-- tailwind.config.ts                    # Tailwind content scanning and theme config
|-- postcss.config.mjs                    # PostCSS plugin chain
|-- next.config.mjs                       # Next.js runtime/build config
`-- README.md                             # Project documentation
```

## Core Architecture & Modules

### Main Design Patterns

- **Feature-first modularity:** Storefront behavior is grouped under `src/components/features/storefront` by responsibility (`sections`, `hooks`, `utils`, `types`).
- **Container/presenter split:** `MainStorefrontFeature` acts as the orchestration container, while section components render focused UI slices from props.
- **Hook-based behavior isolation:** Scroll tracking, page transitions, reveal animations, and drawer timing are separated into custom hooks.
- **Typed domain contracts:** Shared interfaces in `src/types/index.ts` and feature contracts in `storefront/types.ts` enforce consistency across data and components.
- **Data-driven rendering:** UI content is primarily sourced from `src/lib/mockData.ts`, making future API replacement straightforward.

### Primary Smart Components

- **`MainStorefrontFeature`**
  - Central state hub for page navigation, menu/cart/modal/chat visibility, search, slider index, and design tool controls.
  - Composes all major sections (`StorefrontHeader`, `StorefrontHome`, `StorefrontDepartments`, `StorefrontAuth`, `StorefrontCartDrawer`, `StorefrontDesignModal`, `StorefrontChat`, `StorefrontFooter`).
  - Coordinates transitions, section scrolling, chat interactions, design upload/reset/submit behavior, and auth flow handlers.
- **`StorefrontHeader`**
  - Handles responsive nav interactions, active section highlighting, search field expansion, and cart/register entry points.
- **`StorefrontHome`**
  - Renders hero carousel, design CTA, product grid with filtering, and contact/map blocks with reveal animations.
- **`StorefrontAuth`**
  - Switches login/register modes, displays contextual benefits, validates form state, and shows submission state transitions.

### Critical Custom Hooks

- **`usePageViewTransition`**: Manages current logical page (`home`, `departments`, `login`, `register`) and transition timing.
- **`useCartDrawerAnimation`**: Separates render/open states to achieve smooth drawer mount/unmount animation.
- **`useHeaderScrollVisibility`**: Auto-hides/reveals sticky header based on scroll direction and thresholds.
- **`useHomeSectionReveal`**: Uses `IntersectionObserver` to trigger per-section entrance animations.
- **`useActiveNavTracking`**: Maps visible home sections to active navigation state via observer events.
- **`useAuthForm`**: Encapsulates auth form state, touched tracking, and async-like submit status simulation.

### State Management Flow

This project currently uses **local component state (`useState`) + derived memoization (`useMemo`)** rather than a global store.

- Root interaction state is maintained in `MainStorefrontFeature`.
- State and callback props are passed down to section components.
- Feature hooks mutate root state through setter injection.
- Utility functions (`getAuthErrors`, `isAuthSubmittable`, `formatTry`) remain pure and side-effect free.

This flow keeps behavior explicit and predictable for a single-route storefront experience while remaining easy to migrate to a global store if complexity increases.

### Key Utilities and Services

- **`src/components/features/storefront/utils/auth.ts`**
  - Contains auth mode typing and validation rules.
  - Exposes `getAuthBenefits`, `getAuthErrors`, and `isAuthSubmittable`.
- **`src/components/features/storefront/utils/format.ts`**
  - Provides localized Turkish Lira formatting (`Intl.NumberFormat` with `tr-TR` locale).
- **`src/lib/mockData.ts`**
  - Centralized typed content for navigation, products, cart preview, auth copy, departments, footer, and chat seed messages.

## Getting Started (Setup)

### 1) Prerequisites

- Node.js 18+ (recommended current LTS)
- npm 9+

### 2) Install Dependencies

```bash
npm install
```

### 3) Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 4) Build for Production

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev`
  - Starts Next.js in development mode with hot reloading.
- `npm run build`
  - Creates an optimized production build.
- `npm run start`
  - Runs the production server from the built output.
- `npm run lint`
  - Runs project lint checks via Next.js lint integration.
