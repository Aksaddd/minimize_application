"""Browser activity tracking endpoints."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from database import get_db
from schemas.browser_activity import BrowserEventCreate, BrowserEventResponse

router = APIRouter()


@router.post("/events", response_model=BrowserEventResponse)
async def create_browser_event(
    event: BrowserEventCreate, db: Session = Depends(get_db)
):
    """Record a browser tab event from the Chrome extension."""
    from models.browser_event import BrowserEvent

    db_event = BrowserEvent(
        url=event.url,
        domain=event.domain,
        page_title=event.page_title,
        started_at=event.started_at,
        ended_at=event.ended_at,
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


@router.get("/today")
async def get_today_browsing(db: Session = Depends(get_db)):
    """Get today's browsing summary."""
    # TODO: Implement
    return {}


@router.get("/range")
async def get_browsing_range(
    from_date: str = Query(..., alias="from"),
    to_date: str = Query(..., alias="to"),
    db: Session = Depends(get_db),
):
    """Get browsing history for a date range."""
    # TODO: Implement
    return {}


@router.get("/domains")
async def get_top_domains(db: Session = Depends(get_db)):
    """Get top domains with total time spent."""
    # TODO: Implement
    return []
