const model = require('../models/telegramBotModel');
const prayerController = require('./prayerController');
const telegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { format } = require('path');
require('dotenv').config();
const token = process.env.TELEGRAM_TOKEN;
const bot = new telegramBot(token, { polling: true });

// Subscribe a user to receive daily prayer time updates, and post today's prayer time.
bot.onText(/\/start/, (msg) => {
    const id = msg.chat.id;
    subscribe(id);
    bot.sendMessage(id, "Assalaamu 'Alaykum. You will now receive salah times on a daily basis. If you would like these to stop, type /stop");
    prayerController.getPrayerTimes()
    .then(prayers => {
        sendPrayerTimes(id, prayers, 0);
    })
});

// Schedule daily prayer time message at 21:00.
// 0th minute, 21st Hour, *Every day, *Every month, *Every day of week.
cron.schedule('0 21 * * *', () => {
    prayerController.getPrayerTimes()
    .then(prayers => {
        getSubscribers()
        .then((subscribers) => {
            subscribers.forEach(subscriber => {
                sendPrayerTimes(subscriber.ChatID, prayers, 1);
            })
        })
    })
})

// Unsubscribe a user's chat ID from receiving prayer time updates.
bot.onText(/\/stop/, (msg) => {
    const id = msg.chat.id;
    unsubscribe(id);
    bot.sendMessage(id, "You will no longer receive salah time updates.");
});

/**
 * This function sends user(s) a message with the prayer times of either today or tomorrow.
 * 
 * @param {number} id The chat ID
 * @param {Array.<Object>} prayers The prayer table for today and tomorrow
 * @param {number} day Is this for today or tomorrow?
 */
function sendPrayerTimes(id, prayers, day) {
    bot.sendMessage(id, `<b>${ day ? "Tomorrow" : "Today"}</b>\n` +
    `<b>${formatDate()}</b>\n\n` +
    `<u>Salah start times:</u>\n` +
    `Fajr: ${prayers[day]['fajr'].slice(0,5)}am\n` +
    `Dhuhr: ${prayers[day]['dhuhr'].slice(0,5)}pm\n` +
    `'Asr (1st Mithl): ${prayers[day]['asr_1'].slice(0,5)}pm\n` +
    `'Asr (2nd Mithl): ${prayers[day]['asr_2'].slice(0,5)}pm\n` +
    `Maghrib: ${prayers[day]['maghrib'].slice(0,5)}pm\n` +
    `Isha': ${prayers[day]['isha'].slice(0,5)}pm\n\n` +
    `<u>Jama'ah times:</u>\n` +
    `Fajr Jama'ah: ${prayers[day]['fajr_jamaah'].slice(0,5)}am\n` +
    `Dhuhr: ${prayers[day]['dhuhr_jamaah'].slice(0,5)}pm\n` +
    `'Asr Jama'ah: ${prayers[day]['asr_jamaah'].slice(0,5)}pm\n` +
    `Maghrib Jama'ah: ${prayers[day]['maghrib_jamaah'].slice(0,5)}pm\n` +
    `Isha' Jama'ah: ${prayers[day]['isha_jamaah'].slice(0,5)}pm\n\n`,
    {parse_mode: "HTML"})
}

/**
 * Fate formatter to return date in word format
 * 
 * @returns A formatted date in the format "Day, Date Month Year" in words.
 */
function formatDate() {
    const tomorrow = getTomorrowsDate();
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    const day = tomorrow.getDay();
    const date = tomorrow.getDate();
    const month = tomorrow.getMonth();
    const year = tomorrow.getFullYear();
    return `${days[day]}, ${date} ${months[month]} ${year}`
}

/**
 * Get tomorrow's date.
 * 
 * @returns The date for tomorrow.
 */
function getTomorrowsDate() {
    const today = new Date();
    return new Date(today.getTime() + (24 * 60 * 60 * 1000))//.toISOString().slice(0,10);
}

/**
 * Subscribe a user to daily prayer times.
 * 
 * @param {number} id 
 */
async function subscribe(id) {
    await model.subscribe(id);
}

/**
 * Unubscribe a user from daily prayer times.
 * 
 * @param {number} id 
 */
async function unsubscribe(id) {
    await model.unsubscribe(id);
}

/**
 * Get a list of subscribed chat IDs.
 * 
 * @param {number} id 
 */
async function getSubscribers() {
    return await model.getSubscribers();
}
