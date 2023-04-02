const db = require('../services/db')
const currentYear = new Date().getFullYear();

// Format date to ISO standard format
// (to allow for use of MYSQL date operators)
function formatDate(dateStr) {
    const date = new Date(`${dateStr}-${currentYear}`); // create date object
    const formattedDate = date.toISOString().slice(0,10); // formats the date to YYYY-MM-DD
    return formattedDate;
}

// Check if a prayer times table exists for the current year
async function checkForPrayerTimes() {
    try {
        const query = `SHOW TABLES LIKE 'prayer_times_${currentYear}'`; // checks if table exists
        const [rows] = await db.executeQuery(query); // execute query
        return rows.length > 0; // would return more than 0 if a result is found
    } catch (err) {
        throw err;
    }
}

// Create a prayer table for the current year
async function createPrayerTable() {
    try {
        const query = `CREATE TABLE prayer_times_${currentYear} (
            date DATE PRIMARY_KEY
        )`
    } catch (err) {
        throw err;
    }
}