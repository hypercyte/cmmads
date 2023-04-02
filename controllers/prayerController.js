const model = require('../models/prayerModel')

// Code for parsing .csv prayer times
// IF TABLE DOESNT EXIST

// Do sql check if table exists
model.checkForPrayerTimes().then(tableExists => {
    console.log("Does prayer time table exist? " + tableExists)
}).catch(e => {
    console.log(e)
});

// Function on what to do after finding out if prayer table exists or not
// Make function, then call in the .then() block above


