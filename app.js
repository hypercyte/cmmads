const express = require('express')
const http = require('http');
const port = 3000;

// Database connectivity test
//require('./test/db_test')

// Run controllers
require('./controllers/prayerController')

// Set up express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Listen for requests
app.listen(port);

app.get('/shahporan', (req, res) => {
    res.render('pages/index');
})

app.get('/shahporan/display', (req, res) => {
    res.render('pages/displayMode');
})

const server = http.createServer((req, res) => {
    console.log(req);
});

// Listen for requests at given port.
// port
// hostname
// callback
//server.listen(port, 'localhost', () => {
//    console.log(`Listening for requests on port ${port}`);
//});
