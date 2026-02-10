"""Pydantic schemas for application endpoints."""

from datetime import datetime

from pydantic import BaseModel


class ApplicationBase(BaseModel):
    process_name: str
    display_name: str | None = None
    category_id: int | None = None
    is_hidden: bool = False


class ApplicationUpdate(BaseModel):
    display_name: str | None = None
    category_id: int | None = None
    is_hidden: bool | None = None


class ApplicationResponse(ApplicationBase):
    id: int
    icon_path: str | None = None
    first_seen: datetime
    total_time_today_seconds: int = 0
    category_name: str | None = None

    model_config = {"from_attributes": True}
