# AGENTS.md - Lemon_restaurant

## Project Overview
- **Type**: React 19 + TypeScript + Vite + Tailwind CSS v4 SPA
- **Purpose**: Little Lemon restaurant website
- **TS Config**: Strict mode enabled

## Commands

### Development
```bash
npm run dev           # Start Vite dev server (port 5173)
```

### Build & Lint
```bash
npm run build         # TypeScript compile + Vite production build
npm run lint          # ESLint linting (flat config)
npm run preview       # Preview production build
```

### Testing
```bash
# No test framework configured - this is a TODO
# To add tests: npm create vitest@latest
# Then run: npm run test        # Run all tests
#          npm run test -- --run testFile.test.ts  # Single file
```

## Code Style Guidelines

### TypeScript
- **Strict mode**: Enabled (`tsconfig.app.json`)
- **Return types**: Explicitly annotate component returns with `: JSX.Element`
- **Type-only imports**: Use `import type { ... }` for types
- **Unused code**: `noUnusedLocals` and `noUnusedParameters` are true - remove unused vars

### Components
- **Export**: Named exports (e.g., `export const Header`)
- **Structure**: Components go in `src/components/` or `src/pages/`
- **File naming**: PascalCase `.tsx` (components), `.ts` (utilities/context)
- **Props**: Define with explicit TypeScript interfaces outside component

### Imports
- Order: 1) React imports, 2) Third-party libs, 3) Internal components, 4) Assets
- Use `import type` for type-only imports
- Use absolute imports from `src/` (configured via tsconfig paths)

### Naming
- **Components**: PascalCase (e.g., `Header`, `TestimonialCard`)
- **Variables/functions**: camelCase
- **Interfaces**: PascalCase with `I` prefix optional (current: no prefix, e.g., `NavLink`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for config objects

### Tailwind CSS v4
- Use `@import "tailwindcss"` and `@theme` for custom config (`src/index.css`)
- Custom colors defined: `greenlim`, `yellowlim`, `whitelim`, `blacklim`, `graylim`
- Custom fonts: `karla` (sans), `markazy` (serif)
- Utility classes for layout (flex, grid, positioning)
- Responsive: `md:`, `lg:` breakpoints

### Error Handling
- Avoid silent failures - use optional chaining `?.` and nullish coalescing `??`
- Component errors: Let React handle via error boundaries if needed

### Context
- Place in `src/context/`
- Use `createContext<T>({})` with typed default
- Custom hooks for consumption (e.g., `useLemon`)

## File Structure
```
src/
├── App.tsx              # Router setup
├── main.tsx             # Entry point
├── index.css            # Tailwind + theme
├── assets/              # Images, fonts
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/               # Route pages
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Menu.tsx
│   └── Booking.tsx
├── context/             # React context
│   └── context.tsx
└── utils/               # Helpers, data
    ├── navLinks.ts
    └── ...
```

## Lint Configuration
- ESLint flat config (`eslint.config.js`)
- Plugins: `react-hooks`, `react-refresh`, `typescript-eslint`
- Ignores: `dist/`

## Common Tasks
- **Add new page**: Create in `pages/`, add Route in `App.tsx`
- **Add component**: Create in `components/`, import where needed
- **Add context**: Create provider in `context/`, wrap in `App.tsx`
- **Style**: Use Tailwind classes, follow custom theme colors