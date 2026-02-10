"""Category model for user-defined application groupings."""

from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    color: Mapped[str] = mapped_column(String(7), default="#6366f1")
    icon: Mapped[str] = mapped_column(String(50), default="folder")
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )

    applications = relationship("Application", back_populates="category")
