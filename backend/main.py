import os
from typing import Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.config import settings
from app.client import fetch_apod_from_nasa
from app.schemas import ApodResponse

# Initialize FastAPI application
app = FastAPI(
    title="AstroDaily API",
    description="Backend service for AstroDaily, powered by NASA's Astronomy Picture of the Day API.",
    version="0.1.0",
)

# CORS Configuration
# Allows local Next.js development server to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
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


@app.get("/api/apod", response_model=ApodResponse, tags=["APOD"])
async def get_apod(date: Optional[str] = None):
    """
    Fetch Astronomy Picture of the Day (APOD) data from NASA.
    If date is omitted, fetches today's APOD.
    """
    raw_data = await fetch_apod_from_nasa(date=date)
    copyright_val = raw_data.get("copyright")
    if copyright_val:
        copyright_val = str(copyright_val).strip()

    return ApodResponse(
        date=raw_data.get("date", ""),
        title=raw_data.get("title", "Untitled Astronomy Picture"),
        explanation=raw_data.get("explanation", ""),
        url=raw_data.get("url", ""),
        hdurl=raw_data.get("hdurl"),
        media_type=raw_data.get("media_type", "image"),
        thumbnail_url=raw_data.get("thumbnail_url"),
        copyright=copyright_val,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
