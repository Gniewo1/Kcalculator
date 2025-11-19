# Kcalculator AI Agent Instructions

## Project Overview
Kcalculator is a calorie tracking web application with a Django REST backend and a React/Vite frontend. It helps users log daily food intake, calculate calories, and compare against monthly limits.

## Architecture
- **Backend (`backend/`)**: Django REST Framework, SQLite, Knox for authentication. Apps: `users` (custom user, calorie limits), `items` (food items, eaten items).
- **Frontend (`frontend/`)**: React (JSX), Vite, Axios for API calls, React Router for navigation, context for authentication.
- **Docker**: `docker-compose.yml` orchestrates both services. Backend on port 8000, frontend on 5173.

## Key Workflows
- **Start (Dev):**
  - `docker-compose up` (runs both backend and frontend)
  - Or run backend: `python manage.py runserver` in `backend/`, frontend: `npm run dev` in `frontend/`
- **Build (Frontend):** `npm run build` (Vite)
- **Lint (Frontend):** `npm run lint`
- **Backend Migrations:**
  - `python manage.py makemigrations`
  - `python manage.py migrate`
- **Testing:**
  - Backend: Django test files in each app (e.g., `items/tests.py`).

## API & Data Flow
- **Auth:**
  - Register: `POST /auth/register/` (returns token)
  - Login: `POST /auth/login/` (returns token)
  - Check: `GET /auth/check-auth/` (token required)
- **Items:**
  - List: `GET /items/`
  - Add eaten item: `POST /eatenitems/` (token required)
  - Monthly summary: `GET /eatenitems/monthly_summary/?year=YYYY&month=MM`
- **Calories Limit:**
  - Set/get via `/calorieslimit/` endpoints

## Patterns & Conventions
- **Frontend Auth:**
  - Token stored in `localStorage`, sent as `Authorization: Token ...` header
  - Auth state managed in `src/context/AuthContext.jsx`
- **Backend Auth:**
  - Custom user model (`users.models.CustomUser`)
  - Knox tokens for authentication
- **API URLs:**
  - All API endpoints are served from backend (default: `http://127.0.0.1:8000/`)
- **Data Ownership:**
  - All food/calorie data is user-specific; queries filter by authenticated user
- **Monthly Calories:**
  - Tracked via `CaloriesLimit` model and summarized in backend

## Integration Points
- **Frontend/Backend:**
  - Axios calls from frontend to backend API
  - CORS enabled for all origins (see `CORS_ALLOW_ALL_ORIGINS` in backend settings)
- **Docker:**
  - Both services mount local code for live reload

## Examples
- **Login Flow:** See `frontend/src/pages/Login/Login.jsx` and `backend/users/views.py` (`LoginAPI`)
- **Monthly Summary:** See `backend/items/views.py` (`monthly_summary` action)
- **Calorie Limit:** See `backend/users/models.py` and `backend/users/views.py` (`CaloriesLimitViewSet`)

## Special Notes
- **Polish/English mix in comments and UI; be aware of language context.**
- **Custom user model is required for all auth logic.**
- **Frontend expects backend at `localhost:8000` for API calls.**

---

If any section is unclear or missing, please provide feedback for further refinement.