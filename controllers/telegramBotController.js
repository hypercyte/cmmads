const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });
