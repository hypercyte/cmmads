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

module.exports = {
    insertNewUser
}