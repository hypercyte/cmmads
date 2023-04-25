const model = require('../models/announcementModel');

/**
 * This function gets all the announcements from the database.
 * 
 * @returns Result set of announcements
 */
async function getAnnouncements() {
    const announcements = await model.getAnnouncements();
    return announcements;
}

/**
 * This function sends an announcement edit to the database.
 * 
 * @param {number} id The announcement ID
 * @param {string} newTitle The edited title
 * @param {string} newContent The edited content
 */
async function edit(id, newTitle, newContent) {
    await model.edit(id, newTitle, newContent);
}

/**
 * This function adds an announcement to the database.
 * 
 * @param {string} title The announcement title
 * @param {string} content The announcement content
 */
async function add(title, content) {
    await model.add(title, content);
}

module.exports = {
    getAnnouncements,
    edit,
    add
}
