const model = require('../models/authModel');

// Request model to insert the new user.
function insertNewUser(name, username, email, hash) {
    model.insertNewUser(name, username, email, hash)
}

async function findUser(username) {
    return await model.findUser(username);
}

module.exports = {
    insertNewUser,
    findUser
}
