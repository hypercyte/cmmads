const db = require('../services/db'); // db service

// Enter new room data into the database
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
    getRooms,
    findRoomByID
}