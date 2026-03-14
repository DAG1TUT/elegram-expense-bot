"""
FSM для пошагового ввода отчёта при закрытии смены и редактирования после отправки.
"""
from aiogram.fsm.state import State, StatesGroup


class ReportFSM(StatesGroup):
    """Состояния ввода полей отчёта по смене."""

    revenue = State()
    cash_balance = State()
    stock_balance = State()
    expenses = State()
    comment = State()
    confirm = State()
    editing = State()  # ввод нового значения при нажатии «Изменить»
    confirm_big_value = State()  # переспрос при подозрительно большом числе


class EditReportFSM(StatesGroup):
    """Редактирование уже отправленного отчёта (до 24:00 того же дня)."""

    choosing_field = State()
    waiting_value = State()
