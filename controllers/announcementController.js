const model = require('../models/announcementModel');

async function getAnnouncements() {
    const announcements = await model.getAnnouncements();
    return announcements;
}

async function edit(id, newTitle, newContent) {
    await model.edit(id, newTitle, newContent);
}

async function add(title, content) {
    await model.add(title, content);
}

module.exports = {
    getAnnouncements,
    edit,
    add
}
