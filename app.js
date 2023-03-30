const express = require('express')
const http = require('http');
const port = 3000;

// Set up express app
const app = express();

// Listen for requests
app.listen(port);

app.get('/', (req, res) => {
    res.send('<p>CMMADS is running</p>')
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

