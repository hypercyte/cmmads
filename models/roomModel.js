const db = require('../services/db'); // db service

/**
 * This function inserts a new room into the database.
 * 
 * @param {string} location 
 */
async function insertNewRoom(location) {
    try {
        const query = `INSERT INTO Rooms (
            \`location\`
        ) VALUES (
            '${location}'
        );`; 
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function deletes a room from the database.
 * 
 * @param {number} id 
 */
async function deleteRoom(id) {
    try {
        const query = `DELETE FROM Rooms
            WHERE \`ID\` = ?;`
        const params = [id];
        const resultset = await db.executeQuery(query, params); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function finds a room from the database.
 * 
 * @param {number} id 
 * @returns Result set containing the room found if any.
 */
async function findRoomByID(id) {
    try {
        const query = `SELECT * FROM Rooms WHERE \`ID\` = '${id}'`;
        const resultset = await db.executeQuery(query);
        console.log("Found room:");
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * This function gets all the rooms in the database.
 * 
 * @returns Result set of all rooms
 */
async function getRooms() {
    try {
        const query = `SELECT * FROM Rooms`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    insertNewRoom,
    deleteRoom,
    getRooms,
    findRoomByID
}