# HotelEase DB Frontend

## Description
Animated, professional React app for HotelEase Hotel Management System. Uses Tailwind CSS, Framer Motion, Lottie, and Recharts.

## Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:4000
```

## Deployment

- **Vercel/Netlify:** Set `VITE_API_URL` env var, use `npm run build`
- **Accessible UI:** All animations have reduced-motion fallback, color contrast checked.

## Mock Mode

If backend is unavailable, frontend will use mock adapter (see `src/api/mock.js`).

## License

MIT
