"""Pydantic schemas for category endpoints."""

from datetime import datetime

from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str
    color: str = "#6366f1"
    icon: str = "folder"


class CategoryUpdate(BaseModel):
    name: str | None = None
    color: str | None = None
    icon: str | None = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    color: str
    icon: str
    created_at: datetime
    app_count: int = 0
    total_time_today_seconds: int = 0

    model_config = {"from_attributes": True}


class BatchAssignApps(BaseModel):
    app_ids: list[int]
