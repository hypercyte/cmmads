const db = require('../services/db'); // db service

// Enter new user data into the database
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

// Make user admin
async function makeAdmin(id) {
    try {
        const query = `UPDATE users SET \`isAdmin\` = 1 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

// Remove admin from user
async function removeAdmin(id) {
    try {
        const query = `UPDATE users SET \`isAdmin\` = 0 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

// Activate user
async function activateUser(id) {
    try {
        const query = `UPDATE users SET \`active\` = 1 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

// Deactivate user
async function deactivateUser(id) {
    try {
        const query = `UPDATE users SET \`active\` = 0 WHERE \`ID\` = ${id};`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

// Delete user
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
