# HotelEase DB Backend

## Description
Enterprise-grade Node.js/Express backend for HotelEase Hotel Management System. Connects to Oracle DB (or Postgres), exposes REST APIs, and supports mock mode for frontend development.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in your Oracle DB credentials.
   - To use mock mode (no DB), set `MOCK_MODE=true` in `.env`.

3. **Run server:**
   ```bash
   npm run dev
   ```

## Environment Variables

| Name                | Description                |
|---------------------|---------------------------|
| ORACLE_USER         | Oracle DB username        |
| ORACLE_PASSWORD     | Oracle DB password        |
| ORACLE_CONNECTSTRING| Oracle connect string     |
| JWT_SECRET          | JWT signing secret        |
| FRONTEND_URL        | Allowed CORS origin       |
| MOCK_MODE           | true/false for mock DB    |

## API Endpoints

- `POST /api/bookings` — Create a booking (calls stored procedure)
- See `/controllers` and `/routes` for more

## Testing

```bash
npm test
```

## Deployment

- Heroku/Railway/OCI: Set env vars, install Oracle client, run `npm start`
- For direct DB exposure, see Oracle ORDS docs

## Mock Mode

Set `MOCK_MODE=true` in `.env` to use in-memory DB for frontend dev.

## License

MIT
