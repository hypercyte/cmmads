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

module.exports = {
    insertNewUser,
    findUser,
    findUserByID,
    getActiveUsers,
    getInactiveUsers
}
