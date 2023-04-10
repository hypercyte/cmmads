const express = require('express')
const http = require('http');
const port = 3000;

// Database connectivity test
//require('./test/db_test')

// Run controllers
const prayerController = require('./controllers/prayerController.js')

// async function getPrayerTimes() {
//     const prayers = await prayerController.getPrayerTimes();
//     return prayers;
// }

// Set up express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Listen for requests
app.listen(port);

app.get('/shahporan', (req, res) => {
    res.render('pages/index');
})

app.get('/shahporan/display', async (req, res) => {
    const prayerTimes = prayerController.getPrayerTimes()
    .then(out => {
        console.log(out);
        res.render('pages/displayMode', { prayers: out });
        setInterval(() => {
            res.render('pages/displayMode', { prayers: out, datenow: Date.now() });
            
        }, 5000)
    })
    .catch(err => console.log(err));  
    
})

app.use((req, res) => {
    res.status(404).render('pages/404');
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
