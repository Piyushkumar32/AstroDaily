from datetime import date
from typing import Optional
from app.schemas import ApodResponse


class ApodMemoryCache:
    """
    Lightweight in-memory daily cache for NASA APOD responses.
    Caches APOD items by date string (YYYY-MM-DD) to prevent redundant upstream API calls.
    """

    def __init__(self) -> None:
        self._cache: dict[str, ApodResponse] = {}

    def get(self, apod_date: Optional[str] = None) -> Optional[ApodResponse]:
        """
        Retrieve cached APOD item for the given date.
        If date is None, checks for today's date in UTC.
        """
        key = apod_date or date.today().isoformat()
        return self._cache.get(key)

    def set(self, apod_data: ApodResponse) -> None:
        """
        Store APOD item in cache under its returned publication date.
        """
        if apod_data and apod_data.date:
            self._cache[apod_data.date] = apod_data

    def clear(self) -> None:
        """Clear all cached entries."""
        self._cache.clear()


# Global cache instance for the application
apod_cache = ApodMemoryCache()
