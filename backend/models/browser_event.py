"""Browser activity tracking model."""

from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class BrowserEvent(Base):
    __tablename__ = "browser_events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    url: Mapped[str] = mapped_column(Text, nullable=False)
    domain: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    page_title: Mapped[str | None] = mapped_column(String(500))
    started_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, index=True
    )
    ended_at: Mapped[datetime | None] = mapped_column(DateTime)

    @property
    def duration_seconds(self) -> int | None:
        if self.ended_at and self.started_at:
            return int((self.ended_at - self.started_at).total_seconds())
        return None
