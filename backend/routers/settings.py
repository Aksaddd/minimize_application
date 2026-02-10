"""User settings endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

router = APIRouter()


@router.get("/")
async def get_settings(db: Session = Depends(get_db)):
    """Get all user settings."""
    # TODO: Implement
    return {}


@router.patch("/")
async def update_settings(db: Session = Depends(get_db)):
    """Update user settings (partial update)."""
    # TODO: Implement
    return {}
