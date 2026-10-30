import os
import re
import sys
from pathlib import Path
from typing import Optional

# Ensure the backend directory is in sys.path for robust modular imports
backend_dir = str(Path(__file__).resolve().parent)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.config import settings
from app.client import fetch_apod_from_nasa
from app.schemas import ApodResponse
from app.cache import apod_cache

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


def _extract_youtube_thumbnail(url: str) -> Optional[str]:
    """Helper to derive a thumbnail URL for YouTube videos if NASA does not provide one."""
    youtube_match = re.search(r"(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/\s]{11})", url)
    if youtube_match:
        video_id = youtube_match.group(1)
        return f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
    return None


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
    Fetch Astronomy Picture of the Day (APOD) data from NASA with support for both
    image and video media types, plus in-memory caching.
    """
    # Check cache first
    cached_apod = apod_cache.get(date)
    if cached_apod:
        return cached_apod

    # Fetch from NASA API
    raw_data = await fetch_apod_from_nasa(date=date)

    media_type = raw_data.get("media_type", "image").lower()
    media_url = raw_data.get("url", "")
    thumbnail_url = raw_data.get("thumbnail_url")

    # If media is video and thumbnail was not returned, attempt fallback extraction
    if media_type == "video" and not thumbnail_url and media_url:
        thumbnail_url = _extract_youtube_thumbnail(media_url)

    copyright_val = raw_data.get("copyright")
    if copyright_val:
        copyright_val = str(copyright_val).strip()

    apod_result = ApodResponse(
        date=raw_data.get("date", ""),
        title=raw_data.get("title", "Untitled Astronomy Picture"),
        explanation=raw_data.get("explanation", ""),
        url=media_url,
        hdurl=raw_data.get("hdurl"),
        media_type=media_type,
        thumbnail_url=thumbnail_url,
        copyright=copyright_val,
    )

    # Store in daily cache
    apod_cache.set(apod_result)
    return apod_result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
