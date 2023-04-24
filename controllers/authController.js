const model = require('../models/authModel');

// Request model to insert the new user.
function insertNewUser(name, username, email, hash) {
    model.insertNewUser(name, username, email, hash);
}

async function findUser(username) {
    return await model.findUser(username);
}

async function findUserByID(id) {
    return await model.findUserByID(id);
}

async function getActiveUsers() {
    return await model.getActiveUsers();
}

async function getInactiveUsers() {
    return await model.getInactiveUsers();
}

// Make user admin
async function makeAdmin(id) {
    return await model.makeAdmin(id);
}

// Enter new user data into the database
async function removeAdmin(id) {
    return await model.removeAdmin(id);
}

// Activate user
async function activateUser(id) {
    return await model.activateUser(id);
}

// Deactivate user
async function deactivateUser(id) {
    return await model.deactivateUser(id);
}

// Delete user
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
