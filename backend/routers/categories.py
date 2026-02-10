"""Category management endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

router = APIRouter()


@router.get("/")
async def list_categories(db: Session = Depends(get_db)):
    """List all categories with app counts."""
    # TODO: Implement
    return []


@router.post("/")
async def create_category(db: Session = Depends(get_db)):
    """Create a new category."""
    # TODO: Implement
    return {}


@router.patch("/{category_id}")
async def update_category(category_id: int, db: Session = Depends(get_db)):
    """Update category name, color, or icon."""
    # TODO: Implement
    return {}


@router.delete("/{category_id}")
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    """Delete a category. Apps become uncategorized."""
    # TODO: Implement
    return {}


@router.get("/{category_id}/apps")
async def list_category_apps(category_id: int, db: Session = Depends(get_db)):
    """List applications in a category."""
    # TODO: Implement
    return []


@router.patch("/{category_id}/apps")
async def assign_apps_to_category(category_id: int, db: Session = Depends(get_db)):
    """Batch-assign applications to a category."""
    # TODO: Implement
    return {}
