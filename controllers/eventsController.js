const model = require('../models/eventsModel');

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
    await model.insertNewEvent(title, desc, date, startTime, endTime, roomID, requestor);
}

/**
 * This function approves an event
 * 
 * @param {number} id 
 */
async function approveEvent(id) {
    await model.approveEvent(id);
}

/**
 * This function denies an event, and deletes its data.
 * 
 * @param {number} id 
 */
async function denyEvent(id) {
    await model.denyEvent(id);
}

/**
 * This event queries the database to find an event using it's ID
 * 
 * @param {number} id 
 * @returns Result set containing the found event
 */
async function findEventByID(id) {
    return await model.findEventByID(id);
}

/**
 * This function finds events requested/hosted by a specific user using their user ID.
 * 
 * @param {number} id 
 * @returns Result set of events by user ID
 */
async function findEventsByUserID(id) {
    return await model.findEventsByUserID(id);
}

/**
 * The function gets all events
 * 
 * @returns Result set of all events in the database
 */
async function getEvents() {
    return await model.getEvents();
}

/**
 * This function gets all events that are yet to be approved by the admin.
 * 
 * @returns Result set of all unapproved events
 */
async function getUnapprovedEvents() {
    return await model.getUnapprovedEvents();
}

/**
 * This function gets all events that have been approved.
 * 
 * @returns Result set of all approved events
 */
async function getApprovedEvents() {
    return await model.getApprovedEvents();
}

module.exports = {
    insertNewEvent,
    findEventByID,
    findEventsByUserID,
    getEvents,
    getUnapprovedEvents,
    getApprovedEvents,
    approveEvent,
    denyEvent
}
