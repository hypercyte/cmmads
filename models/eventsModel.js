const db = require('../services/db'); // db service

// Enter new room data into the database
async function insertNewEvent(title, desc, date, startTime, endTime, roomID, requestor) {
    try {
        const query = `INSERT INTO Events (
            \`Title\`,
            \`Description\`,
            \`Date\`,
            \`RoomsID\`,
            \`UserID\`
        ) VALUES (
            '${title}',
            '${desc}',
            '${date}',
            '${roomID}',
            '${requestor}'
        );`; 
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

async function findEventByID(id) {
    try {
        const query = `SELECT * FROM Events WHERE \`ID\` = '${id}'`;
        const resultset = await db.executeQuery(query);
        console.log("Found event:");
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

async function findEventsByUserID(id) {
    try {
        const query = `SELECT * FROM Events WHERE \`UserID\` = '${id}'`;
        const resultset = await db.executeQuery(query);
        console.log("Found event(s):");
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

async function getUnapprovedEvents() {
    try {
        const query = `SELECT * FROM Events WHERE \`Approved\` = 0`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

async function getEvents() {
    try {
        const query = `SELECT * FROM Events`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    insertNewEvent,
    getEvents,
    getUnapprovedEvents,
    findEventByID,
    findEventsByUserID
}