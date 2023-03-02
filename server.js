const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req);
});

// Listen for requests at given port.
// port
// hostname
// callback
server.listen(port, 'localhost', () => {
    console.log(`Listening for requests on port ${port}`);
});