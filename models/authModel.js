const db = require('../services/db'); // db service

// Enter new user data into the database
async function insertNewUser(name, username, email, hash) {
    try {
        const query = `INSERT INTO users (
            \`name\`,
            \`username\`,
            \`email\`,
            \`hash\`,
            \`active\`
        ) VALUES (
            '${name}',
            '${username}',
            '${email}',
            '${hash}',
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

module.exports = {
    insertNewUser,
    findUser,
    findUserByID
}