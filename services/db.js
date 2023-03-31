const mysql = require('mysql2');
const db_config = require('../config/db_config');

const pool = mysql.createPool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function executeQuery(query, params) {
    const [rows, fields] = await pool.execute(query, params);
    return rows;
}

//async function makeQuery(query, params) {
//    const [rows, fields] = await pool.query(query, params);
//    return rows;
//}

module.exports = {
    executeQuery
}