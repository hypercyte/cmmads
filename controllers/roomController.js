const model = require('../models/roomModel');

/**
 * This function inserts a new room into the database.
 * 
 * @param {string} location 
 */
async function insertNewRoom(location) {
    await model.insertNewRoom(location);
}

/**
 * This function deletes a room from the database.
 * 
 * @param {number} id 
 */
async function deleteRoom(id) {
    await model.deleteRoom(id);
}

/**
 * This function finds a room from the database.
 * 
 * @param {number} id 
 * @returns Result set containing the room found if any.
 */
async function findRoomByID(id) {
    return await model.findRoomByID(id);
}

/**
 * This function gets all the rooms in the database.
 * 
 * @returns Result set of all rooms
 */
async function getRooms() {
    return await model.getRooms();
}

module.exports = {
    insertNewRoom,
    deleteRoom,
    findRoomByID,
    getRooms
}
