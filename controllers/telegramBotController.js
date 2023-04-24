const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const id = msg.chat.id;
    bot.sendMessage(id, "Assalaamu 'Alaykum. You will now receive salah times on a daily basis. If you would like these to stop, type /stop");
});
  