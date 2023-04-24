const db = require('../services/db'); // db service

async function getSubscribers() {
    try {
        const query = `SELECT * FROM Bot_Subscribers`;
        const resultset = await db.executeQuery(query);
        return resultset;
    } catch (err) {
        console.log(err);
    }
}

async function subscribe(id) {
    try {
        const query = `INSERT INTO Bot_Subscribers (
            \`chatID\`
        ) VALUES (
            '${id}'
        );`; 
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

async function unsubscribe(id) {
    try {
        const query = `DELETE FROM Bot_Subscribers WHERE \`chatID\` = ${id}`;
        const resultset = await db.executeQuery(query); // execute query
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    subscribe,
    unsubscribe,
    getSubscribers
}
