from typing import Optional
from pydantic import BaseModel, Field


class ApodResponse(BaseModel):
    """Schema for NASA Astronomy Picture of the Day response."""

    date: str = Field(..., description="Date of the APOD in YYYY-MM-DD format")
    title: str = Field(..., description="Title of the astronomical picture/video")
    explanation: str = Field(..., description="Editorial explanation written by professional astronomers")
    url: str = Field(..., description="URL of the APOD media (image or video embed)")
    hdurl: Optional[str] = Field(None, description="URL of the high-resolution image if available")
    media_type: str = Field("image", description="Type of media ('image' or 'video')")
    thumbnail_url: Optional[str] = Field(None, description="URL of the video thumbnail if returned by NASA")
    copyright: Optional[str] = Field(None, description="Copyright owner attribution if not public domain")


class ErrorResponse(BaseModel):
    """Standardized error response schema."""

    detail: str = Field(..., description="Descriptive error message")
    status_code: int = Field(..., description="HTTP status code")
