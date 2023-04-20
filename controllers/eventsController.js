const model = require('../models/eventsModel');

// Request model to insert the new user.
async function insertNewEvent(title, desc, date, startTime, endTime, roomID) {
    await model.insertNewEvent(title, desc, date, startTime, endTime, roomID);
}

async function findEventByID(id) {
    return await model.findRoomByID(id);
}

async function getEvents() {
    return await model.getRooms();
}

module.exports = {
    insertNewEvent,
    findEventByID,
    getEvents
}
