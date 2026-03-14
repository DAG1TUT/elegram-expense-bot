"""
Общие клавиатуры.
"""
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


def kb_cancel() -> InlineKeyboardMarkup:
    """Кнопка отмены (для FSM)."""
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="❌ Отмена", callback_data="report_cancel")]
    ])


def kb_confirm_big_value() -> InlineKeyboardMarkup:
    """Подтверждение большого значения: да, верно / нет, ввести заново / отмена."""
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="✅ Да, верно", callback_data="report_confirm_big_yes")],
        [InlineKeyboardButton(text="✏️ Нет, ввести заново", callback_data="report_confirm_big_no")],
        [InlineKeyboardButton(text="❌ Отмена", callback_data="report_cancel")],
    ])


def kb_cancel_back() -> InlineKeyboardMarkup:
    """Отмена и Назад (при вводе полей отчёта, не на первом шаге)."""
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="◀️ Назад", callback_data="report_step_back"),
            InlineKeyboardButton(text="❌ Отмена", callback_data="report_cancel"),
        ]
    ])
