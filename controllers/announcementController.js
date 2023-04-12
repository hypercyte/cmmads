const model = require('../models/announcementModel');

async function getAnnouncements() {
    const announcements = await model.getAnnouncements();
    return announcements;
}

module.exports = {
    getAnnouncements
}