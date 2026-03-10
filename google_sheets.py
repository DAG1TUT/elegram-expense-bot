import json
import os
import sys
from typing import Optional

import gspread
from google.oauth2.service_account import Credentials


def _log(msg: str) -> None:
    print(msg, flush=True)
    sys.stderr.write(msg + "\n")
    sys.stderr.flush()


_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
_cached_sheet = None
_log("[GSHEETS] module loaded")


def _get_sheet() -> Optional[gspread.Worksheet]:
    """Лениво инициализирует клиент Google Sheets и возвращает первый лист.

    Ничего не ломает бота: при любой проблеме просто возвращает None.
    """
    global _cached_sheet
    if _cached_sheet is not None:
        return _cached_sheet

    creds_json = os.environ.get("GOOGLE_SHEETS_CREDS_JSON")
    spreadsheet_id = os.environ.get("GOOGLE_SHEETS_SPREADSHEET_ID")
    if not creds_json:
        _log("[GSHEETS] disabled: GOOGLE_SHEETS_CREDS_JSON is empty")
        return None
    if not spreadsheet_id:
        _log("[GSHEETS] disabled: GOOGLE_SHEETS_SPREADSHEET_ID is empty")
        return None
    try:
        info = json.loads(creds_json)
        credentials = Credentials.from_service_account_info(info, scopes=_SCOPES)
        client = gspread.authorize(credentials)
        sh = client.open_by_key(spreadsheet_id)
        _cached_sheet = sh.sheet1
        # Заголовки в первой строке, если лист пустой
        try:
            first = _cached_sheet.row_values(1)
            if not first or all(c == "" for c in first):
                _cached_sheet.update("A1:E1", [["created_at", "user_id", "amount", "description", "category"]])
                _log("[GSHEETS] headers written")
        except Exception:
            pass
        _log("[GSHEETS] init ok")
        return _cached_sheet
    except Exception as e:
        _log(f"[GSHEETS] init error: {e}")
        return None


def append_expense_to_sheet(
    user_id: int,
    amount: float,
    description: str,
    category: str,
    created_at: str,
) -> None:
    """Добавляет строку с тратой в Google Sheets.

    Формат строки: дата/время, user_id, сумма, описание, категория.
    """
    _log("[GSHEETS] append_expense_to_sheet called")
    sheet = _get_sheet()
    if sheet is None:
        _log("[GSHEETS] skip: sheet not available (check Variables or init logs above)")
        return
    try:
        sheet.append_row(
            [created_at, str(user_id), float(amount), description, category],
            value_input_option="USER_ENTERED",
        )
        _log("[GSHEETS] row appended ok")
    except Exception as e:
        _log(f"[GSHEETS] append error: {e}")

