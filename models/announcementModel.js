const db = require('../services/db');
/**
 * This function gets all announcements from the database.
 * 
 * @returns Result set of announcements, pulled from the database.
 */
const getAnnouncements = async () => {
    const query = `SELECT * FROM announcements`;
    const resultset = await db.executeQuery(query);

    console.log("Just retrived announcements.")

    return resultset;
}

/**
 * This function edits announcements in the database.
 * 
 * @param {number} id The announcement ID
 * @param {string} newTitle The edited title
 * @param {string} newContent The edited content
 */
const edit = async (id, newTitle, newContent) => {
    const query = `UPDATE announcements SET \`Title\` = ?,\`Content\` = ? WHERE \`ID\` = ${id};`;
    const params = [ newTitle, newContent ];
    const resultset = await db.executeQuery(query, params);
}

// Add announcement

/**
 * This function adds announcements in the database.
 * 
 * @param {string} title The announcement title
 * @param {string} content The announcement content
 */
const add = async (title, content) => {
    const query = `INSERT INTO announcements (\`Title\`,\`Content\`) VALUES (? , ?);`;
    const params = [ title, content ];
    const resultset = await db.executeQuery(query, params);
}

module.exports = {
    getAnnouncements,
    edit,
    add
}
