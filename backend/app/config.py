import os
from dotenv import load_dotenv

# Load environment variables from .env file if present
load_dotenv()


class Settings:
    """Application and NASA API configuration settings."""

    # NASA APOD API Configuration
    # Defaults to DEMO_KEY if no custom key is provided in environment variables
    NASA_API_KEY: str = os.getenv("NASA_API_KEY", "DEMO_KEY")
    NASA_APOD_URL: str = "https://api.nasa.gov/planetary/apod"

    # Server Configuration
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # CORS Configuration
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


settings = Settings()
