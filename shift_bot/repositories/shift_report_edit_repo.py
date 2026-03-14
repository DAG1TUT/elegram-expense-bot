"""
Репозиторий истории редактирований отчётов.
"""
from __future__ import annotations

import json
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models.shift_report_edit import ShiftReportEdit


async def add_edit(
    session: AsyncSession,
    shift_report_id: int,
    edited_by_telegram_id: int,
    edited_by_name: str,
    changes: dict[str, Any],
) -> ShiftReportEdit:
    """Записать факт редактирования отчёта (changes: поле -> {old, new})."""
    edit = ShiftReportEdit(
        shift_report_id=shift_report_id,
        edited_by_telegram_id=edited_by_telegram_id,
        edited_by_name=edited_by_name or "",
        changes=json.dumps(changes, ensure_ascii=False),
    )
    session.add(edit)
    await session.flush()
    await session.refresh(edit)
    return edit


async def get_edits_by_report_id(
    session: AsyncSession,
    shift_report_id: int,
) -> list[ShiftReportEdit]:
    """Все правки по отчёту, от старых к новым."""
    result = await session.execute(
        select(ShiftReportEdit)
        .where(ShiftReportEdit.shift_report_id == shift_report_id)
        .order_by(ShiftReportEdit.edited_at.asc())
    )
    return list(result.scalars().all())
