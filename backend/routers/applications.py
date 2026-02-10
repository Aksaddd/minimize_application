"""Application management endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

router = APIRouter()


@router.get("/")
async def list_applications(db: Session = Depends(get_db)):
    """List all tracked applications with category and usage stats."""
    # TODO: Implement with joins to categories and daily_summaries
    return []


@router.get("/running")
async def list_running_applications():
    """List currently running applications detected on the system."""
    # TODO: Use app_discovery service
    return []


@router.get("/{app_id}")
async def get_application(app_id: int, db: Session = Depends(get_db)):
    """Get details for a single application."""
    # TODO: Implement
    return {}


@router.patch("/{app_id}")
async def update_application(app_id: int, db: Session = Depends(get_db)):
    """Update application display name, category, or hidden status."""
    # TODO: Implement
    return {}
