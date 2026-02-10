"""Pydantic schemas for minimize schedule endpoints."""

from datetime import datetime

from pydantic import BaseModel, model_validator


class ScheduleCreate(BaseModel):
    app_id: int
    schedule_type: str  # 'idle', 'time_based', 'always'
    idle_threshold_seconds: int | None = None
    start_time: str | None = None
    end_time: str | None = None
    days_of_week: str | None = None
    detection_mode: str = "process"
    title_pattern: str | None = None

    @model_validator(mode="after")
    def validate_schedule_fields(self):
        if self.schedule_type == "idle" and not self.idle_threshold_seconds:
            raise ValueError("idle_threshold_seconds required for idle schedules")
        if self.schedule_type == "time_based":
            if not self.start_time or not self.end_time:
                raise ValueError("start_time and end_time required for time_based schedules")
        return self


class ScheduleUpdate(BaseModel):
    schedule_type: str | None = None
    idle_threshold_seconds: int | None = None
    start_time: str | None = None
    end_time: str | None = None
    days_of_week: str | None = None
    is_enabled: bool | None = None
    detection_mode: str | None = None
    title_pattern: str | None = None


class ScheduleResponse(BaseModel):
    id: int
    app_id: int
    app_name: str | None = None
    schedule_type: str
    idle_threshold_seconds: int | None = None
    start_time: str | None = None
    end_time: str | None = None
    days_of_week: str | None = None
    is_enabled: bool
    detection_mode: str
    title_pattern: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
