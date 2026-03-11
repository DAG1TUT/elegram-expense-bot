# -*- coding: utf-8 -*-
"""
Вебхук для Instagram Direct (Messenger Platform).
Принимает входящие сообщения и отправляет автоответы клиентам кофейни «На Восходе».

Требования:
- Instagram Business/Creator аккаунт, привязанный к Facebook Page
- Meta приложение с продуктом Instagram Messaging и правами instagram_manage_messages
- Переменные окружения: INSTAGRAM_VERIFY_TOKEN, INSTAGRAM_PAGE_ACCESS_TOKEN
"""

import json
import logging
import os
import time

import requests
from dotenv import load_dotenv

load_dotenv()
from flask import Flask, request

from replies import get_default_reply, get_reply

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

VERIFY_TOKEN = os.environ.get("INSTAGRAM_VERIFY_TOKEN", "")
PAGE_ACCESS_TOKEN = os.environ.get("INSTAGRAM_PAGE_ACCESS_TOKEN", "")
GRAPH_API_VERSION = os.environ.get("META_GRAPH_API_VERSION", "v21.0")
GRAPH_URL = f"https://graph.facebook.com/{GRAPH_API_VERSION}/me/messages"

# Небольшая задержка перед ответом (чтобы не упираться в лимиты и выглядеть естественнее)
REPLY_DELAY_SEC = float(os.environ.get("INSTAGRAM_REPLY_DELAY_SEC", "1.0"))


def send_message(recipient_id: str, text: str) -> bool:
    """Отправляет текстовое сообщение в Instagram Direct через Graph API."""
    if not PAGE_ACCESS_TOKEN:
        logger.error("INSTAGRAM_PAGE_ACCESS_TOKEN not set")
        return False
    payload = {
        "recipient": {"id": recipient_id},
        "message": {"text": text[:1000]},  # лимит API
    }
    try:
        r = requests.post(
            GRAPH_URL,
            params={"access_token": PAGE_ACCESS_TOKEN},
            json=payload,
            timeout=10,
        )
        data = r.json()
        if "error" in data:
            logger.error("Graph API error: %s", data["error"])
            return False
        logger.info("Sent message to %s", recipient_id)
        return True
    except Exception as e:
        logger.exception("Failed to send message: %s", e)
        return False


def handle_message(sender_id: str, text: str) -> None:
    """Определяет ответ по тексту и отправляет его."""
    if not text:
        return
    reply = get_reply(text)
    if reply is None:
        reply = get_default_reply()
    if REPLY_DELAY_SEC > 0:
        time.sleep(REPLY_DELAY_SEC)
    send_message(sender_id, reply)


def process_instagram_entry(entry: dict) -> None:
    """Обрабатывает одну запись из webhook (одна страница/IG аккаунт)."""
    for item in entry.get("messaging", []):
        sender = item.get("sender", {}).get("id")
        if not sender:
            continue
        # Игнорируем эхо (наши же сообщения)
        if item.get("message", {}).get("is_echo"):
            continue
        # Текст от пользователя
        message = item.get("message", {})
        text = message.get("text", "").strip() if isinstance(message.get("text"), str) else ""
        if text:
            handle_message(sender, text)
        # Можно обработать postback (кнопки) и т.д.
        postback = item.get("postback", {})
        if postback:
            payload = postback.get("payload", "")
            if payload:
                handle_message(sender, payload)


@app.route("/webhook/instagram", methods=["GET"])
def verify_webhook():
    """Верификация вебхука Meta (при настройке подписки)."""
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")
    if mode == "subscribe" and token == VERIFY_TOKEN:
        logger.info("Webhook verified")
        return challenge or ""
    return "Forbidden", 403


@app.route("/webhook/instagram", methods=["POST"])
def receive_webhook():
    """Приём входящих событий от Instagram (сообщения и т.д.)."""
    try:
        body = request.get_data(as_text=True)
        data = json.loads(body) if body else {}
    except Exception as e:
        logger.warning("Invalid JSON body: %s", e)
        return "Bad Request", 400

    if data.get("object") != "instagram":
        return "OK", 200

    for entry in data.get("entry", []):
        try:
            process_instagram_entry(entry)
        except Exception as e:
            logger.exception("Error processing entry: %s", e)

    return "OK", 200


@app.route("/health")
def health():
    """Проверка работоспособности (для деплоя)."""
    return "OK"


if __name__ == "__main__":
    if not VERIFY_TOKEN or not PAGE_ACCESS_TOKEN:
        logger.warning(
            "Set INSTAGRAM_VERIFY_TOKEN and INSTAGRAM_PAGE_ACCESS_TOKEN for production."
        )
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")
