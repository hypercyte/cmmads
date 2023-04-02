const db = require('../services/db')
const currentYear = new Date().getFullYear();

// Format date to ISO standard format
// (to allow for use of MYSQL date operators)
function formatDate(dateStr) {
    const date = new Date(`${dateStr}-${currentYear}`); // create date object
    const formattedDate = date.toISOString().slice(0,10); // formats the date to YYYY-MM-DD
    return formattedDate;
}

async function checkForPrayerTimes() {
    try {
        const query = `SHOW TABLES LIKE 'prayer_times_${currentYear}'`;
        const [rows] = await db.executeQuery(query);
        return rows.length > 0;
    } catch (err) {
        throw err;
    }
}

async function createPrayerTable() {
    try {
        const query = `CREATE TABLE prayer_times_${currentYear} (
            date DATE PRIMARY_KEY
        )`
    } catch (err) {
        throw err;
    }
}