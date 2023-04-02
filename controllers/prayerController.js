const model = require('../models/prayerModel')

// Code for parsing .csv prayer times
// IF TABLE DOESNT EXIST

// Do sql check if table exists
const prayerTimesTableExists = model.checkForPrayerTimes();
console.log(prayerTimesTableExists);