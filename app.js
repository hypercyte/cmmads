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

// Root route
app.get('/shahporan', (req, res) => {
    res.render('pages/index');
})

// Async route for display mode
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

// Route for log-in
app.get('/shahporan/login', (req, res) => {
    res.render('pages/login.ejs');
})

// Route for register
app.get('/shahporan/register', (req, res) => {
    res.render('pages/register.ejs');
})

// POST route for register
app.post('/shahporan/register', (req, res) => {
    // Implement register post function
})

// Serve files from public folder
app.use(express.static('./public'));

// 404 page
app.use((req, res) => {
    res.status(404).render('pages/404');
})

