const db = require('../services/db'); // db service

/**
 * This function queries the database to find a user by their username.
 * 
 * @param {string} username The user's username
 * @returns Result set of user found with this username
 */
async function insertNewUser(name, username, email, hash) {
    try {
        const query = `INSERT INTO users (
            \`name\`,
            \`username\`,
            \`email\`,
            \`hash\`,
            \`active\`,
            \`isAdmin\`
        ) VALUES (
            '${name}',
            '${username}',
            '${email}',
            '${hash}',
            false,
            false
        );`; 
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function queries the database to find a user by their username.
 * 
 * @param {string} username The user's username
 * @returns Result set of user found with this username
 */
async function findUser(username) {
    try {
        const query = `SELECT * FROM users WHERE \`username\` = '${username}'`;
        const resultset = await db.executeQuery(query);
        console.log("Found user:");
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * This function queries the database to find a user by their ID.
 * 
 * @param {number} id The user ID
 * @returns Result set of user found with this ID
 */
async function findUserByID(id) {
    try {
        const query = `SELECT * FROM users WHERE \`ID\` = '${id}'`;
        const resultset = await db.executeQuery(query);
        console.log("Found user by ID:");
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * This function queries the database and finds all activated users.
 * 
 * @returns Result set of all active users.
 */
async function getActiveUsers() {
    try {
        const query = `SELECT * FROM users WHERE active = '1';`;
        const resultset = await db.executeQuery(query);
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * This function queries the database and finds all deactivated users.
 * 
 * @returns Result set of all inactive users.
 */
async function getInactiveUsers() {
    try {
        const query = `SELECT * FROM users WHERE active = '0';`;
        const resultset = await db.executeQuery(query);
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

/**
 * This function takes a user ID and updates their entry in the database to make them an admin user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function makeAdmin(id) {
    try {
        const query = `UPDATE users SET \`isAdmin\` = 1 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function takes a user ID and updates their entry in the database to make them a normal user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function removeAdmin(id) {
    try {
        const query = `UPDATE users SET \`isAdmin\` = 0 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function takes a user ID and updates their entry to make them an active user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function activateUser(id) {
    try {
        const query = `UPDATE users SET \`active\` = 1 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function takes a user ID and updates their entry to make them an inactive user.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function deactivateUser(id) {
    try {
        const query = `UPDATE users SET \`active\` = 0 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

/**
 * This function takes a user ID and removes their data.
 * 
 * @param {number} id The user ID
 * @returns SQL insert result object
 */
async function deleteUser(id) {
    try {
        const query = `DELETE FROM users WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
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
