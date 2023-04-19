const db = require('../services/db'); // db service

// Enter new class data into the database
async function insertNewClass(title, desc, active, roomID) {
    try {
        const query = `INSERT INTO Classes (
            \`title\`,
            \`desc\`,
            \`active\`,
            \`roomID\`
        ) VALUES (
            '${title}',
            '${desc}',
            '${active}',
            '${roomID}'
        );`; 
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

async function findClassByID(id) {
    try {
        const query = `SELECT * FROM Classes WHERE \`ID\` = '${id}'`;
        const resultset = await db.executeQuery(query);
        console.log("Found class:");
        console.log(resultset);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

async function getClasses() {
    try {
        const query = `SELECT * FROM Classes`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    insertNewClass,
    getClasses,
    findClassByID
}