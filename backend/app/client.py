from typing import Any, Optional
import httpx
from fastapi import HTTPException, status
from app.config import settings


async def fetch_apod_from_nasa(date: Optional[str] = None) -> dict[str, Any]:
    """
    Fetch the Astronomy Picture of the Day data directly from the official NASA APOD API
    with comprehensive error handling.

    Args:
        date: Optional date in YYYY-MM-DD format. If omitted, NASA returns today's APOD.

    Returns:
        Raw dictionary response from NASA API.

    Raises:
        HTTPException with appropriate status code and clear error details.
    """
    if not settings.NASA_API_KEY or settings.NASA_API_KEY.strip() == "":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="NASA API key is not configured on the backend server.",
        )

    params: dict[str, Any] = {
        "api_key": settings.NASA_API_KEY,
        "thumbs": "true",  # Request thumbnail for video APODs
    }
    if date:
        params["date"] = date

    timeout = httpx.Timeout(15.0, connect=10.0)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(settings.NASA_APOD_URL, params=params)

            # Handle specific upstream HTTP status codes from NASA
            if response.status_code == 403 or response.status_code == 401:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="NASA API authentication failed. The configured NASA_API_KEY is invalid.",
                )

            if response.status_code == 429:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="NASA APOD API rate limit exceeded. Please configure a personal NASA_API_KEY.",
                )

            if response.status_code == 404:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Astronomy Picture of the Day not found for the requested date.",
                )

            if response.status_code >= 500:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Upstream NASA APOD service encountered an internal error. Please try again shortly.",
                )

            response.raise_for_status()

            try:
                data = response.json()
            except ValueError:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Received an invalid response format from NASA APOD service.",
                )

            if not isinstance(data, dict):
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Unexpected data structure received from NASA APOD service.",
                )

            return data

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Connection to NASA API timed out. Please try again later.",
        )
    except httpx.NetworkError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to reach NASA API servers. Please check network connectivity.",
        )
    except httpx.HTTPStatusError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"NASA API returned an unexpected error (status {exc.response.status_code}).",
        )
