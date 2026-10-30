# AstroDaily - Local Development Guide

AstroDaily is a modern Astronomy Picture of the Day application powered by FastAPI and Next.js.

---

## 1. Prerequisites

- **Node.js** (v18.18.0 or newer) and **npm**
- **Python** (v3.10 or newer) and **pip**
- A NASA API key from [api.nasa.gov](https://api.nasa.gov/). (Falls back to `DEMO_KEY` if not configured).

---

## 2. Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   # Windows PowerShell
   python -m venv .venv
   .venv\Scripts\activate

   # macOS / Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your `NASA_API_KEY`:
   ```ini
   NASA_API_KEY=YOUR_NASA_API_KEY
   ```

5. Start the backend development server:
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

6. Verify endpoints:
   - APOD Data: [http://127.0.0.1:8000/api/apod](http://127.0.0.1:8000/api/apod)
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

3. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Default:
   ```ini
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   - [http://localhost:3000](http://localhost:3000)

---

## 4. Architecture & Security Notes

- **API Security**: The NASA API key is strictly maintained server-side and is never exposed in client bundles.
- **In-Memory Caching**: APOD responses are cached in memory by date to minimize upstream API consumption and respect rate limits.
- **CORS**: FastAPI allows cross-origin requests originating from the Next.js development server (`http://localhost:3000`).
