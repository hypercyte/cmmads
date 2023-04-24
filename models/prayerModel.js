const db = require('../services/db');
const csv = require('csv-parser');
const fs = require('fs');
const currentYear = new Date().getFullYear();

function getTomorrowsDate() {
    const today = new Date();
    return new Date(today.getTime() + (24 * 60 * 60 * 1000)*2).toISOString().slice(0,10);
}

// Get prayer times from the database
const getPrayerTimes = async () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date
    const tomorrow = getTomorrowsDate(); // Get tomorrow's date
    const query = `SELECT * FROM prayer_times_${currentYear} WHERE \`date\` = ? OR \`date\` = ?`;
    const params = [today, tomorrow];
    const resultset = await db.executeQuery(query, params);

    resultset[0]['date'].setHours(15); // Set hours to counter DST adjustment
    resultset[1]['date'].setHours(15); // Set hours to counter DST adjustment

    console.log("Just fetched latest prayer times from DB.")

    return resultset;
}

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
            exportPrayerTimes(results);
            console.log("Prayer times exported.")
        })
}

// Export prayer times to the mysql database
function exportPrayerTimes(prayerTimes) {
    prayerTimes.forEach(async day => {
        try {
            const query = `INSERT INTO prayer_times_${currentYear} (
                \`DATE\`,
                \`DAY\`,
                \`FAJR\`,
                \`FAJR_JAMAAH\`,
                \`SUNRISE\`,
                \`DHUHR\`,
                \`DHUHR_JAMAAH\`,
                \`ASR_1\`,
                \`ASR_2\`,
                \`ASR_JAMAAH\`,
                \`MAGHRIB\`,
                \`MAGHRIB_JAMAAH\`,
                \`ISHA\`,
                \`ISHA_JAMAAH\`,
                \`DAY_OF_YEAR\`
            ) VALUES (
                '${day['DATE']}',
                '${day['DAY']}',
                '${day['FAJR']}',
                '${day['FAJR_JAMAAH']}',
                '${day['SUNRISE']}',
                '${day['DHUHR']}',
                '${day['DHUHR_JAMAAH']}',
                '${day['ASR_1']}',
                '${day['ASR_2']}',
                '${day['ASR_JAMAAH']}',
                '${day['MAGHRIB']}',
                '${day['MAGHRIB_JAMAAH']}',
                '${day['ISHA']}',
                '${day['ISHA_JAMAAH']}',
                '${day['DAY_OF_YEAR']}'
            );`; 
            const resultset = await db.executeQuery(query); // execute query
            //return resultset.length > 0; // would return more than 0 if a result is found
        } catch (err) {
            throw err;
        }
    })
}


// Format date to ISO standard format
// (to allow for use of MYSQL date operators)
function formatDate(dateStr) {
    const splitDate = dateStr.split(' '); // Split date by space (i.e. "31 Mar" -> "31","Mar")
    const hour = "15"; // Any hour in the day besides 00 so daylight saving doesnt cause a duplicate date at 26 Mar.
    const month = getMonth(splitDate[1]); // Get the month string (i.e. "Mar" from "31 Mar")
    const date = new Date(Date.UTC(currentYear, month, splitDate[0], hour)); // Create Date object
    const formattedDate = date.toISOString().slice(0,10); // Cut ISO string which is compatible with MYSQL Date datatype.
    return formattedDate;
}

// Get month number based on index in this array.
function getMonth(monthStr) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months.indexOf(monthStr);
}

// Check if a prayer times table exists for the current year
async function checkForPrayerTimes() {
    try {
        const query = `SHOW TABLES LIKE 'prayer_times_${currentYear}'`; // checks if table exists
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
            day VARCHAR(3),
            fajr TIME,
            fajr_jamaah TIME,
            sunrise TIME,
            dhuhr TIME,
            dhuhr_jamaah TIME,
            asr_1 TIME,
            asr_2 TIME,
            asr_jamaah TIME,
            maghrib TIME,
            maghrib_jamaah TIME,
            isha TIME,
            isha_jamaah TIME,
            day_of_year INT
        );`
        db.executeQuery(query);
        console.log(`...Prayer times table created.`)
    } catch (err) {
        throw err;
    }
}

async function updatePrayerTimes(selectedPrayer, newTime, dateFrom, dateTo) {
    try {
        console.log(selectedPrayer,newTime,dateFrom,dateTo);
        const query = `update prayer_times_${currentYear} set \`${selectedPrayer}\` = '${newTime}' where \`DATE\` between ? and ?;`;
        const params = [dateFrom, dateTo]; 
        const resultset = await db.executeQuery(query, params); // execute query
        console.log("updated prayer times:");
        console.log(resultset);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkForPrayerTimes,
    createPrayerTable,
    formatDate,
    importedPrayerTimes,
    getPrayerTimes,
    updatePrayerTimes
};
