"""MinimizeSchedule model for automatic minimization rules."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class MinimizeSchedule(Base):
    __tablename__ = "minimize_schedules"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    app_id: Mapped[int] = mapped_column(
        ForeignKey("applications.id", ondelete="CASCADE"), nullable=False
    )
    schedule_type: Mapped[str] = mapped_column(
        String(20), nullable=False
    )  # 'idle', 'time_based', 'always'

    # Idle-based fields
    idle_threshold_seconds: Mapped[int | None] = mapped_column(Integer)

    # Time-based fields
    start_time: Mapped[str | None] = mapped_column(String(5))   # HH:MM
    end_time: Mapped[str | None] = mapped_column(String(5))     # HH:MM
    days_of_week: Mapped[str | None] = mapped_column(String(50))  # "mon,tue,wed"

    # Common fields
    is_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    detection_mode: Mapped[str] = mapped_column(
        String(10), default="process"
    )  # 'process' or 'title'
    title_pattern: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    application = relationship("Application", back_populates="schedules")
