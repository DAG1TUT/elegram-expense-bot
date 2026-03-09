#!/bin/bash
# Запуск бота с виртуальным окружением (голос + всё остальное)
cd "$(dirname "$0")"
# Чтобы бот нашёл ffprobe/ffmpeg (нужны для голосовых)
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  echo "Задай токен: TELEGRAM_BOT_TOKEN=\"твой_токен\" ./run.sh"
  exit 1
fi
./venv/bin/python bot.py
