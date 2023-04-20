const express = require('express')
const http = require('http');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

const port = 3000;

// Database connectivity test
//require('./test/db_test')

// Run controllers
const prayerController = require('./controllers/prayerController.js')
const announcementController = require('./controllers/announcementController.js')
const authController = require('./controllers/authController.js')
const roomController = require('./controllers/roomController.js')

// Initialise passport
const initialisePassport = require('./config/passport_config.js')
initialisePassport(
    passport,
    username => {
        return authController.findUser(username);
    },
    id => {
        return authController.findUserByID(id);
    }
);

// async function getPrayerTimes() {
//     const prayers = await prayerController.getPrayerTimes();
//     return prayers;
// }

// Set up express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Parse incoming body reqs from clientside
app.use(express.urlencoded({ extended:false }));

// Express app use flash
app.use(flash());

// Express session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// Passport initialisation
app.use(passport.initialize());
app.use(passport.session());

// Listen for requests
app.listen(port);

// Root route
app.get('/shahporan', (req, res) => {
    res.render('pages/index');
})

// Async route for display mode
app.get('/shahporan/display', async (req, res) => {
    const prayerTimes = prayerController.getPrayerTimes();
    const announcements= announcementController.getAnnouncements();
    Promise.all([prayerTimes, announcements])
    .then(([prayerTimesOut, announcementOut]) => {
        res.render('pages/displayMode', { prayers: prayerTimesOut, announcements: announcementOut });
    })
    .catch(err => console.log(err));
})

// Route for admin - home
app.get('/shahporan/admin', (req, res) => {
    res.render('pages/admin.ejs');
})

// Route for admin - events management
app.get('/shahporan/admin/events-management', (req, res) => {
    const rooms = roomController.getRooms();
    Promise.all([rooms])
    .then(([roomsOut]) => {
        res.render('pages/adminEventsManagement.ejs', {rooms: roomsOut});
    })
});

// Route for room booking/event booking
app.get('/shahporan/events-booking', (req, res) => {
    const rooms = roomController.getRooms();
    Promise.all([rooms])
    .then(([roomsOut]) => {
        res.render('pages/eventBooking.ejs', {rooms: roomsOut});
    })
});

// Route for log-in
app.get('/shahporan/login', (req, res) => {
    res.render('pages/login.ejs');
})

// Route for register
app.get('/shahporan/register', (req, res) => {
    res.render('pages/register.ejs');
})

// POST route for login
app.post('/shahporan/login', passport.authenticate('local', {
    successRedirect: '/shahporan/admin',
    failureRedirect: '/shahporan/login',
    failureFlash: true
}))

// POST route for register
app.post('/shahporan/register', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            authController.insertNewUser(name, username, email, hash);
            res.redirect('/shahporan/login')
        });
    });
})

// POST route for updating prayer times
app.post('/shahporan/admin/update-prayer-times', async (req, res) => {
    const selectedPrayer = req.body.prayerSelect;
    const time = req.body.newTime;
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;

    prayerController.updatePrayerTimes(selectedPrayer, time, dateFrom, dateTo);
    res.redirect('/shahporan/admin');
})

// POST route for adding a room
app.post('/shahporan/admin/add-room', async (req, res) => {
    const location = req.body.location;

    roomController.insertNewRoom(location)
    .then(() => {
        res.redirect('/shahporan/admin/events-management');
    })
})

// Serve files from public folder
app.use(express.static('./public'));

// 404 page
app.use((req, res) => {
    res.status(404).render('pages/404');
})
