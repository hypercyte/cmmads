const model = require('../models/roomModel');

// Request model to insert the new user.
async function insertNewRoom(location) {
    await model.insertNewRoom(location);
}

async function deleteRoom(id) {
    await model.deleteRoom(id);
}

async function findRoomByID(id) {
    return await model.findRoomByID(id);
}

async function getRooms() {
    return await model.getRooms();
}

module.exports = {
    insertNewRoom,
    deleteRoom,
    findRoomByID,
    getRooms
}
