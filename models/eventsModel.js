const db = require('../services/db'); // db service

/**
 * This functions inserts a new event into the database
 * 
 * @param {string} title The title
 * @param {string} desc The description
 * @param {string} date The date of event
 * @param {string} startTime The start time
 * @param {string} endTime The end time
 * @param {number} roomID The room ID
 * @param {number} requestor The user ID of the event booking requestor
 */
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

/**
 * This function approves an event
 * 
 * @param {number} id 
 */
async function approveEvent(id) {
    try {
        const query = `UPDATE Events
            SET \`Approved\` = 1
            WHERE \`ID\` = ?;`
        const params = [id];
        const resultset = await db.executeQuery(query, params); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function denies an event, and deletes its data.
 * 
 * @param {number} id 
 */
async function denyEvent(id) {
    try {
        const query = `DELETE FROM Events
            WHERE \`ID\` = ?;`
        const params = [id];
        const resultset = await db.executeQuery(query, params); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This event queries the database to find an event using it's ID
 * 
 * @param {number} id 
 * @returns Result set containing the found event
 */
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

/**
 * This function finds events requested/hosted by a specific user using their user ID.
 * 
 * @param {number} id 
 * @returns Result set of events by user ID
 */
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

/**
 * This function gets all events that are yet to be approved by the admin.
 * 
 * @returns Result set of all unapproved events
 */
async function getUnapprovedEvents() {
    try {
        const query = `SELECT * FROM Events WHERE \`Approved\` = 0`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * This function gets all events that have been approved.
 * 
 * @returns Result set of all approved events
 */
async function getApprovedEvents() {
    try {
        const query = `SELECT * FROM Events WHERE \`Approved\` = 1`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * The function gets all events
 * 
 * @returns Result set of all events in the database
 */
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
    getApprovedEvents,
    findEventByID,
    findEventsByUserID,
    approveEvent,
    denyEvent
}