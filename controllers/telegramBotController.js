const model = require('../models/telegramBotModel');
const prayerController = require('./prayerController');
const telegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const id = msg.chat.id;
    subscribe(id);
    bot.sendMessage(id, "Assalaamu 'Alaykum. You will now receive salah times on a daily basis. If you would like these to stop, type /stop");
    prayerController.getPrayerTimes()
    .then(prayers => {
        sendPrayerTimes(id, prayers);
    })
});

// 5th minute, 0th Hour, *Every day, *Every month, *Every day of week.
cron.schedule('5 0 * * *', () => {
    prayerController.getPrayerTimes()
    .then(prayers => {
        getSubscribers()
        .then((subscribers) => {
            subscribers.forEach(subscriber => {
                sendPrayerTimes(subscriber.ChatID, prayers);
            })
        })
    })
})

bot.onText(/\/stop/, (msg) => {
    const id = msg.chat.id;
    unsubscribe(id);
    bot.sendMessage(id, "You will no longer receive salah time updates.");
});

function sendPrayerTimes(id, prayers) {
    const today = new Date().toISOString().slice(0, 10);
    bot.sendMessage(id, `<b>${today}</b>\n\n` +
    `<u>Salah start times:</u>\n` +
    `Fajr: ${prayers[0]['fajr'].slice(0,5)}am\n` +
    `Dhuhr: ${prayers[0]['dhuhr'].slice(0,5)}pm\n` +
    `'Asr (1st Mithl): ${prayers[0]['asr_1'].slice(0,5)}pm\n` +
    `'Asr (2nd Mithl): ${prayers[0]['asr_2'].slice(0,5)}pm\n` +
    `Maghrib: ${prayers[0]['maghrib'].slice(0,5)}pm\n` +
    `Isha': ${prayers[0]['isha'].slice(0,5)}pm\n\n` +
    `<u>Jama'ah times:</u>\n` +
    `Fajr Jama'ah: ${prayers[0]['fajr_jamaah'].slice(0,5)}am\n` +
    `Dhuhr: ${prayers[0]['dhuhr_jamaah'].slice(0,5)}pm\n` +
    `'Asr Jama'ah: ${prayers[0]['asr_jamaah'].slice(0,5)}pm\n` +
    `Maghrib Jama'ah: ${prayers[0]['maghrib_jamaah'].slice(0,5)}pm\n` +
    `Isha' Jama'ah: ${prayers[0]['isha_jamaah'].slice(0,5)}pm\n\n`,
    {parse_mode: "HTML"})
}

async function subscribe(id) {
    await model.subscribe(id);
}

async function unsubscribe(id) {
    await model.unsubscribe(id);
}

async function getSubscribers() {
    return await model.getSubscribers();
}
