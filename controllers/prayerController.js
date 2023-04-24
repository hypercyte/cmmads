const model = require('../models/prayerModel')

// Code for parsing .csv prayer times
// IF TABLE DOESNT EXIST

// Do sql check if table exists
model.checkForPrayerTimes().then(tableExists => {
    console.log("Does prayer time table exist? " + tableExists)
    createPrayerTimesTable(tableExists);
}).catch(e => {
    console.log(e)
})

//model.getPrayerTimes().then(resultset => {
//    console.log(resultset);
//})

async function getPrayerTimes() {
    const prayers = await model.getPrayerTimes();
    return prayers;
}

// Function on what to do after finding out if prayer table exists or not
// Make function, then call in the .then() block above
function createPrayerTimesTable(alreadyExists) {
	if (alreadyExists) return;
	model.createPrayerTable();
    model.importedPrayerTimes();
}

function updatePrayerTimes(p,t,df,dt) {
    model.updatePrayerTimes(p,t,df,dt);
}

module.exports = {
    getPrayerTimes,
    updatePrayerTimes
}
