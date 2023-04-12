const express = require('express')
const http = require('http');
const port = 3000;

// Database connectivity test
//require('./test/db_test')

// Run controllers
const prayerController = require('./controllers/prayerController.js')
const announcementController = require('./controllers/announcementController.js')

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
    const announcements= announcementController.getAnnouncements()
    Promise.all([prayerTimes, announcements])
    .then(([prayerTimesOut, announcementOut]) => {      
        console.log(prayerTimesOut);
        console.log(announcementOut);
        res.render('pages/displayMode', { prayers: prayerTimesOut, announcements: announcementOut });
    })
    .catch(err => console.log(err));
})

app.use(express.static('public'))

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
