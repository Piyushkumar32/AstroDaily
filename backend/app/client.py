from typing import Any, Optional
import httpx
from app.config import settings


async def fetch_apod_from_nasa(date: Optional[str] = None) -> dict[str, Any]:
    """
    Fetch the Astronomy Picture of the Day data directly from the official NASA APOD API.

    Args:
        date: Optional date in YYYY-MM-DD format. If omitted, NASA returns today's APOD.

    Returns:
        Raw dictionary response from NASA API.
    """
    params: dict[str, Any] = {
        "api_key": settings.NASA_API_KEY,
        "thumbs": "true",  # Request thumbnail for video APODs
    }
    if date:
        params["date"] = date

    timeout = httpx.Timeout(15.0, connect=10.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.get(settings.NASA_APOD_URL, params=params)
        response.raise_for_status()
        return response.json()
