require('dotenv').config();

module.exports = {
    host: 'mujaah.id',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'cmmads'
}