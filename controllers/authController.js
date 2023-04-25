const model = require('../models/authModel');

/**
 * This function inserts a new user to the database.
 * 
 * @param {string} name The user's name
 * @param {string} username The username
 * @param {string} email The email address
 * @param {string} hash The hashed user password 
 */
function insertNewUser(name, username, email, hash) {
    model.insertNewUser(name, username, email, hash);
}

/**
 * This function queries the database to find a user by their username.
 * 
 * @param {string} username The user's username
 * @returns Result set of user found with this username
 */
async function findUser(username) {
    return await model.findUser(username);
}

/**
 * This function queries the database to find a user by their ID.
 * 
 * @param {number} id The user ID
 * @returns Result set of user found with this ID
 */
async function findUserByID(id) {
    return await model.findUserByID(id);
}

/**
 * This function queries the database and finds all activated users.
 * 
 * @returns Result set of all active users.
 */
async function getActiveUsers() {
    return await model.getActiveUsers();
}

/**
 * This function queries the database and finds all deactivated users.
 * 
 * @returns Result set of all inactive users.
 */
async function getInactiveUsers() {
    return await model.getInactiveUsers();
}

/**
 * This function takes a user ID and updates their entry in the database to make them an admin user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function makeAdmin(id) {
    return await model.makeAdmin(id);
}


/**
 * This function takes a user ID and updates their entry in the database to make them a normal user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function removeAdmin(id) {
    return await model.removeAdmin(id);
}


/**
 * This function takes a user ID and updates their entry to make them an active user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function activateUser(id) {
    return await model.activateUser(id);
}

/**
 * This function takes a user ID and updates their entry to make them an inactive user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function deactivateUser(id) {
    return await model.deactivateUser(id);
}

/**
 * This function takes a user ID and removes their data.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function deleteUser(id) {
    return await model.deleteUser(id);
}


module.exports = {
    insertNewUser,
    findUser,
    findUserByID,
    getActiveUsers,
    getInactiveUsers,
    makeAdmin,
    removeAdmin,
    activateUser,
    deactivateUser,
    deleteUser
}
