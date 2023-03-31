const db = require('../services/db');

async function test() {
    const query = 'SELECT * FROM test';
    const resultset = await db.executeQuery(query);
    return resultset;
}

test().then(resultset => {
    console.log(resultset);
}).catch(e => {
    console.log(e);
})