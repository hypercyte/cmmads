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

// Initialise passport
const initialisePassport = require('./config/passport_config.js')
initialisePassport(passport, username => {
    return authController.findUser(username);
})

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
    const prayerTimes = prayerController.getPrayerTimes()
    const announcements= announcementController.getAnnouncements()
    Promise.all([prayerTimes, announcements])
    .then(([prayerTimesOut, announcementOut]) => {
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

// POST route for login
app.post('/shahporan/login', passport.authenticate('local', {
    successRedirect: '/shahporan',
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

// Serve files from public folder
app.use(express.static('./public'));

// 404 page
app.use((req, res) => {
    res.status(404).render('pages/404');
})
