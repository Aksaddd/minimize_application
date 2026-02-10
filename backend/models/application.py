"""Application model for tracked applications."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    process_name: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=False
    )
    display_name: Mapped[str | None] = mapped_column(String(255))
    icon_path: Mapped[str | None] = mapped_column(String(500))
    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("categories.id", ondelete="SET NULL")
    )
    first_seen: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )
    is_hidden: Mapped[bool] = mapped_column(Boolean, default=False)

    category = relationship("Category", back_populates="applications")
    schedules = relationship(
        "MinimizeSchedule", back_populates="application", cascade="all, delete-orphan"
    )
    screen_time_events = relationship(
        "ScreenTimeEvent", back_populates="application"
    )
