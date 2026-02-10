"""Pydantic schemas for settings endpoints."""

from pydantic import BaseModel


class SettingsResponse(BaseModel):
    tracking_enabled: bool = True
    tracking_interval_ms: int = 5000
    minimize_on_startup: bool = False
    start_with_windows: bool = False
    theme: str = "system"
    data_retention_days: int = 90


class SettingsUpdate(BaseModel):
    tracking_enabled: bool | None = None
    tracking_interval_ms: int | None = None
    minimize_on_startup: bool | None = None
    start_with_windows: bool | None = None
    theme: str | None = None
    data_retention_days: int | None = None
