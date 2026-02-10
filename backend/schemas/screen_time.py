"""Pydantic schemas for screen time endpoints."""

from datetime import datetime

from pydantic import BaseModel


class AppUsageSummary(BaseModel):
    app_id: int
    app_name: str
    process_name: str
    category_name: str | None = None
    category_color: str | None = None
    total_seconds: int
    session_count: int


class DailyUsage(BaseModel):
    date: str
    total_seconds: int
    apps: list[AppUsageSummary]


class CategoryUsage(BaseModel):
    category_id: int | None
    category_name: str
    color: str
    total_seconds: int
    app_count: int


class TrendData(BaseModel):
    date: str
    total_seconds: int


class LiveSession(BaseModel):
    app_id: int | None = None
    app_name: str | None = None
    window_title: str | None = None
    started_at: datetime | None = None
    duration_seconds: int = 0


class TodayOverview(BaseModel):
    total_seconds: int
    apps_tracked: int
    most_used_app: str | None = None
    most_used_seconds: int = 0
    times_minimized: int = 0
    apps: list[AppUsageSummary]
