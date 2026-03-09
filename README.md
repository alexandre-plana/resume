# Interactive Resume - Alexandre Plana

An interactive resume with a GitHub-themed design, built with React 18, TypeScript, Vite, and CSS Modules.

## Tech Stack

- **Vite** - Build tool & dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Component-scoped styling
- **Zustand** - State management
- **TanStack Query v5** - Data fetching & caching

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The dev server will start on `http://localhost:5173`

## Build

```bash
npm run build
```

## Architecture

### Mock-First Approach

By default, the application uses mock data. To switch to a real API, modify `src/api/config.ts`:

```typescript
export const USE_MOCK = false // Change to true for mock data
```

### Project Structure

```
src/
├── api/           # API services & mock data
├── components/    # React components
├── hooks/         # Custom React hooks
├── store/         # Zustand state management
├── styles/        # Global styles & CSS variables
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## Features

- ✅ Personalized profile & bio
- ✅ Professional experiences with detailed missions
- ✅ Technical skills with color-coded badges
- ✅ Education & certifications
- ✅ Contribution graph visualization
- ✅ Recent activity feed
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Bilingual support (FR/EN)

## Configuration

Create a `.env` file at the project root:

```
VITE_API_URL=http://localhost:3000/api
```

## License

MIT
