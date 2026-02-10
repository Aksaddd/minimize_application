"""User settings model."""

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class UserSetting(Base):
    __tablename__ = "user_settings"

    key: Mapped[str] = mapped_column(String(100), primary_key=True)
    value: Mapped[str] = mapped_column(String(500), nullable=False)
