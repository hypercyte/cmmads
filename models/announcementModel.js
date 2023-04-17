const db = require('../services/db');

// Get announcements from the database
const getAnnouncements = async () => {
    const query = `SELECT * FROM announcements`;
    const resultset = await db.executeQuery(query);

    console.log("Just retrived announcements.")
    // console.log(resultset)

    return resultset;
}

module.exports = {
    getAnnouncements
}