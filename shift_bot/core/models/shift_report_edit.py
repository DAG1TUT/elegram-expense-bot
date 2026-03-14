"""
История редактирований отчёта по смене: кто, когда, что изменил.
"""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base


class ShiftReportEdit(Base):
    """Одна запись об изменении отчёта (одно нажатие «Сохранить» может менять несколько полей)."""

    __tablename__ = "shift_report_edits"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    shift_report_id: Mapped[int] = mapped_column(ForeignKey("shift_reports.id"), nullable=False)
    edited_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    edited_by_telegram_id: Mapped[int] = mapped_column(Integer, nullable=False)
    edited_by_name: Mapped[str] = mapped_column(Text, nullable=False, default="")
    # JSON: {"revenue": {"old": 1000, "new": 1200}, "comment": {"old": "—", "new": "Уточнено"}}
    changes: Mapped[str] = mapped_column(Text, nullable=False, default="{}")

    shift_report: Mapped["ShiftReport"] = relationship("ShiftReport", back_populates="edits")

    def __repr__(self) -> str:
        return f"ShiftReportEdit(report_id={self.shift_report_id}, at={self.edited_at})"
