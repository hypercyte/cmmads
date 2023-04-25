const model = require('../models/prayerModel')

// Check if a prayer table exists. If not, create a table with the current year.
model.checkForPrayerTimes().then(tableExists => {
    console.log("Does prayer time table exist? " + tableExists)
    createPrayerTimesTable(tableExists);
}).catch(e => {
    console.log(e)
})

/**
 * This function gets the prayer times for today and tomorrow from the database.
 * 
 * @returns Result set of all prayer times for today and tomorrow.
 */
async function getPrayerTimes() {
    const prayers = await model.getPrayerTimes();
    return prayers;
}

/**
 * This function initiates creation of a prayer time table.
 * 
 * @param {boolean} alreadyExists Does the prayer table already exist?
 * @returns Return early if it already exists as no need to create a table and import times.
 */
function createPrayerTimesTable(alreadyExists) {
	if (alreadyExists) return;
	model.createPrayerTable();
    model.importedPrayerTimes();
}

/**
 * This function updates prayer times (in-bulk) between a range of dates.
 * 
 * @param {string} p The prayer time affected (i.e. Fajr, Fajr Jama'ah etc.)
 * @param {string} t The new prayer time
 * @param {string} df The date from
 * @param {string} dt The date to
 */
function updatePrayerTimes(p,t,df,dt) {
    model.updatePrayerTimes(p,t,df,dt);
}

module.exports = {
    getPrayerTimes,
    updatePrayerTimes
}
