# ShopEase
A shopping cart helps customers collect and manage products they want to buy before completing their purchase.

## Deployment readiness
- Frontend build: run `npm run build` inside the frontend folder.
- Backend start: run `npm start` inside the backend folder.
- Required environment variables:
  - Backend: `MONGO_URI`, `JWT_SECRET`, and optionally `CORS_ORIGIN`.
  - Frontend: `VITE_API_URL` (defaults to `/api`).

## Vercel + Render setup
- Deploy the frontend from the frontend folder on Vercel using the included Vercel config.
- Deploy the backend on Render using the included Render config.
- Set `VITE_API_URL` in Vercel to your Render backend URL, for example `https://your-app.onrender.com/api`.
- Set `MONGO_URI` and `JWT_SECRET` in Render environment variables.

## Production notes
- The backend serves the built frontend in production mode when a frontend build exists.
- A health check is available at `/health`.
