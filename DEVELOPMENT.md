# AstroDaily - Local Development Guide

This guide details how to run both the Frontend and Backend services independently for local development.

---

## 1. Prerequisites

- **Node.js** (v18.18.0 or newer) and **npm**
- **Python** (v3.10 or newer) and **pip**
- (Optional) NASA API key from [api.nasa.gov](https://api.nasa.gov/). You can start with `DEMO_KEY`.

---

## 2. Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

5. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

6. Verify backend is running:
   - Root endpoint: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
   - Health check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
   - Interactive Swagger API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 3. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - [http://localhost:3000](http://localhost:3000)

---

## 4. Architecture Notes

- **CORS**: FastAPI is configured to accept cross-origin requests from `http://localhost:3000`.
- **API Security**: The NASA API key is maintained strictly server-side in the backend service and is never exposed directly to client-side code.
