"""Pydantic schemas for browser activity endpoints."""

from datetime import datetime

from pydantic import BaseModel


class BrowserEventCreate(BaseModel):
    url: str
    domain: str
    page_title: str | None = None
    started_at: datetime
    ended_at: datetime | None = None


class BrowserEventResponse(BaseModel):
    id: int
    url: str
    domain: str
    page_title: str | None
    started_at: datetime
    ended_at: datetime | None
    duration_seconds: int | None

    model_config = {"from_attributes": True}


class DomainSummary(BaseModel):
    domain: str
    total_seconds: int
    visit_count: int


class BrowsingDaySummary(BaseModel):
    total_seconds: int
    domains_visited: int
    top_domains: list[DomainSummary]
