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
            exportPrayerTimes(results);
            //return results;
            //results.forEach(day => {
             //   console.log(day);
            //})
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
            return resultset.length > 0; // would return more than 0 if a result is found
        } catch (err) {
            throw err;
        }
    })
}




// Format date to ISO standard format
// (to allow for use of MYSQL date operators)
function formatDate(dateStr) {
    const splitDate = dateStr.split(' ');
    //const day = splitDate[0];
    //const month = splitDate[1];
    //const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //const monthNumber = months.indexOf(month) + 1; // 0=Jan, 1=Feb, 2=Mar, etc.
    //const formattedDate = `${currentYear}-${monthNumber < 10 ? '0' : ''}${monthNumber}-${day < 10 ? '0' : ''}${day}`
    const hour = "15";
    const month = getMonth(splitDate[1]);
    const date = new Date(Date.UTC(currentYear, month, splitDate[0], hour));
    const formattedDate = date.toISOString().slice(0,10);
    console.log(formattedDate);
    return formattedDate;
}

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
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkForPrayerTimes,
    createPrayerTable,
    formatDate,
    importedPrayerTimes
};