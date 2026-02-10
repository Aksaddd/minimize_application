"""Screen time tracking models."""

from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class ScreenTimeEvent(Base):
    __tablename__ = "screen_time_events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    app_id: Mapped[int] = mapped_column(
        ForeignKey("applications.id"), nullable=False, index=True
    )
    window_title: Mapped[str | None] = mapped_column(String(500))
    started_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, index=True
    )
    ended_at: Mapped[datetime | None] = mapped_column(DateTime)
    was_foreground: Mapped[bool] = mapped_column(Boolean, default=True)

    application = relationship("Application", back_populates="screen_time_events")

    @property
    def duration_seconds(self) -> int | None:
        if self.ended_at and self.started_at:
            return int((self.ended_at - self.started_at).total_seconds())
        return None


class DailySummary(Base):
    __tablename__ = "daily_summaries"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    app_id: Mapped[int] = mapped_column(
        ForeignKey("applications.id"), nullable=False
    )
    date: Mapped[date] = mapped_column(Date, nullable=False)
    total_seconds: Mapped[int] = mapped_column(Integer, default=0)
    session_count: Mapped[int] = mapped_column(Integer, default=0)

    __table_args__ = (
        UniqueConstraint("app_id", "date", name="uq_app_date"),
    )
