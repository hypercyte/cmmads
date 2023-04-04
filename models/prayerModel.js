const db = require('../services/db');
const csv = require('csv-parser');
const fs = require('fs');
const currentYear = new Date().getFullYear();

// Import prayer times from CSV file provided for the current year
const importedPrayerTimes = () => {
    const file = `data/prayer-data-${currentYear}.csv`; // Path to file
    const results = [] // Initialise results array
    fs.createReadStream(file)
        .pipe(csv(  ['DATE',
                    'DAY',
                    'FAJR',
                    'FAJR_JAMAAH',
                    'SUNRISE',
                    'DHUHR',
                    'DHUHR_JAMAAH',
                    'ASR_1',
                    'ASR_2',
                    'ASR_JAMAAH',
                    'MAGHRIB',
                    'MAGHRIB_JAMAAH',
                    'ISHA',
                    'ISHA_JAMAAH',
                    'DAY_OF_YEAR'])) // using csv-parser library & setting headers
        .on('data', (row) => {
            row['DATE'] = formatDate(row['DATE']); // converting date to ISO standard format
            results.push(row);
        })
        .on('end', () => {
            return results;
        })
}

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
        const query = `SHOW TABLES LIKE 'prayer_times%'`//_${currentYear}'`; // checks if table exists
        const resultset = await db.executeQuery(query); // execute query
        return resultset.length > 0; // would return more than 0 if a result is found
    } catch (err) {
        throw err;
    }
}

// Create a prayer table for the current year
async function createPrayerTable() {
    console.log(`Creating prayer times table for year ${currentYear}...`)
    try {
        const query = `CREATE TABLE prayer_times_${currentYear} (
            date DATE PRIMARY KEY,

        )`
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkForPrayerTimes,
    createPrayerTable,
    formatDate
};