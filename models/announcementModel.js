const db = require('../services/db');

// Get announcements from the database
const getAnnouncements = async () => {
    const query = `SELECT * FROM announcements`;
    const resultset = await db.executeQuery(query);

    console.log("Just retrived announcements.")

    return resultset;
}

// Edit announcement
const edit = async (id, newTitle, newContent) => {
    const query = `UPDATE announcements SET \`Title\` = ?,\`Content\` = ? WHERE \`ID\` = ${id};`;
    const params = [ newTitle, newContent ];
    const resultset = await db.executeQuery(query, params);

    return resultset;
}

// Edit announcement
const add = async (title, content) => {
    const query = `INSERT INTO announcements (\`Title\`,\`Content\`) VALUES (? , ?);`;
    const params = [ title, content ];
    const resultset = await db.executeQuery(query, params);

    return resultset;
}


module.exports = {
    getAnnouncements,
    edit,
    add
}
