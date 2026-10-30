import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI application
app = FastAPI(
    title="AstroDaily API",
    description="Backend service for AstroDaily, powered by NASA's APOD API.",
    version="0.1.0",
)

# CORS Configuration
# Allows local Next.js development server to communicate with the backend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
async def root():
    """Root endpoint providing basic API information and documentation link."""
    return {
        "name": "AstroDaily API",
        "version": "0.1.0",
        "status": "operational",
        "message": "Welcome to AstroDaily API. Explore NASA Astronomy Picture of the Day endpoints.",
        "docs_url": "/docs",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend service status."""
    return {
        "status": "healthy",
        "service": "astrodaily-backend",
        "version": "0.1.0",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
