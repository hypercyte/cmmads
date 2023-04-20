const model = require('../models/eventsModel');

// Request model to insert the new user.
async function insertNewEvent(title, desc, date, startTime, endTime, roomID, requestor) {
    await model.insertNewEvent(title, desc, date, startTime, endTime, roomID, requestor);
}

async function findEventByID(id) {
    return await model.findEventByID(id);
}

async function findEventsByUserID(id) {
    return await model.findEventsByUserID(id);
}

async function getEvents() {
    return await model.getEvents();
}

async function getUnapprovedEvents() {
    return await model.getUnapprovedEvents();
}

module.exports = {
    insertNewEvent,
    findEventByID,
    findEventsByUserID,
    getEvents,
    getUnapprovedEvents
}
