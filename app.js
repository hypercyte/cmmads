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
const eventsController = require('./controllers/eventsController.js')
require('./controllers/telegramBotController.js')

// Initialise passport
const initialisePassport = require('./config/passport_config.js');
const { user } = require('./config/db_config.js');
initialisePassport(
    passport,
    username => {
        return authController.findUser(username);
    },
    id => {
        return authController.findUserByID(id);
    }
);


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

/*=================

GET ROUTING

===================*/

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
app.get('/shahporan/admin', async (req, res) => {
    const notAuth = await req.isUnauthenticated();
    const user = await req.user;
    if (notAuth) {
        res.redirect('/shahporan/login');
        return;
    } else if (user[0]['isAdmin'] == 0) {
        res.redirect('/shahporan/events-booking');
        return;
    }

    res.render('pages/admin.ejs');
})

// Route for admin - user management
app.get('/shahporan/admin/user-management', async (req, res) => {
    const notAuth = await req.isUnauthenticated();
    const user = await req.user;
    if (notAuth) {
        res.redirect('/shahporan/login');
        return;
    } else if (user[0]['isAdmin'] == 0) {
        res.redirect('/shahporan/events-booking');
        return;
    }
    const users = authController.getActiveUsers();
    const inactiveUsers = authController.getInactiveUsers();
    Promise.all([users, inactiveUsers])
    .then(([usersOut, inactiveOut]) => { 
        res.render('pages/adminUserManagement.ejs', {
            users: usersOut,
            inactiveUsers: inactiveOut
        });
    })
});

// Route for admin - events management
app.get('/shahporan/admin/events-management', async (req, res) => {
    const notAuth = await req.isUnauthenticated();
    const user = await req.user;
    if (notAuth) {
        res.redirect('/shahporan/login');
        return;
    } else if (user[0]['isAdmin'] == 0) {
        res.redirect('/shahporan/events-booking');
        return;
    }
    const rooms = roomController.getRooms();
    const eventsWaiting = eventsController.getUnapprovedEvents();
    const eventsApproved = eventsController.getApprovedEvents();
    Promise.all([rooms, eventsWaiting, eventsApproved])
    .then(([roomsOut, eventsWaitingOut, eventsApprovedOut]) => {
        res.render('pages/adminEventsManagement.ejs', {
            rooms: roomsOut,
            eventsWaiting: eventsWaitingOut,
            eventsApproved: eventsApprovedOut
        });
    })
});


// Route for admin - announcement management
app.get('/shahporan/admin/announcement-management', async (req, res) => {
    const notAuth = await req.isUnauthenticated();
    const user = await req.user;
    if (notAuth) {
        res.redirect('/shahporan/login');
        return;
    } else if (user[0]['isAdmin'] == 0) {
        res.redirect('/shahporan/events-booking');
        return;
    }
    const announcements = announcementController.getAnnouncements();
    Promise.all([announcements])
    .then(([announceOut]) => {
        res.render('pages/adminAnnouncementManagement.ejs', {
            announcements: announceOut
        });
    })
});

// Route for room booking/event booking
app.get('/shahporan/events-booking', async (req, res) => {
    const notAuth = await req.isUnauthenticated();
    const user = await req.user;
    if (notAuth) {
        res.redirect('/shahporan/login');
        return;
    }
    else if (user[0]['active'] == 0) {
        res.redirect('/shahporan/inactive');
    }
    const rooms = roomController.getRooms();
    const events = eventsController.findEventsByUserID(user[0]['ID']);
    Promise.all([rooms, events])
    .then(([roomsOut, eventsOut]) => {
        res.render('pages/eventBooking.ejs', {rooms: roomsOut, events: eventsOut});
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

// Route for inactive user
app.get('/shahporan/inactive', (req, res) => {
    res.render('pages/inactiveAccount.ejs');
})

/*=================

POST ROUTING

===================*/

// POST route for login
app.post('/shahporan/login', passport.authenticate('local', {
    successRedirect: '/shahporan/',
    failureRedirect: '/shahporan/login',
    failureFlash: true
}))

// POST route for logout
app.post('/shahporan/logout', (req, res) => {
    req.logOut;
    res.redirect('/shahporan/login');
})

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

// POST route for requesting room booking
app.post('/shahporan/request-room-booking', async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const roomID = req.body.roomSelect;
    const user = await req.user;
    const requestor = user[0]['ID'];
    

    eventsController.insertNewEvent(title, desc, date, startTime, endTime, roomID, requestor)
    .then(() => {
        res.redirect('/shahporan/events-booking');
    })
})

// POST route for approving an event
app.post('/shahporan/admin/approve-event', async (req, res) => {
    const eventID = req.body.approveButton;

    eventsController.approveEvent(eventID)
    .then(() => {
        res.redirect('/shahporan/admin/events-management');
    })
})

// POST route for denying an event
app.post('/shahporan/admin/deny-event', async (req, res) => {
    const eventID = req.body.denyButton;

    eventsController.denyEvent(eventID)
    .then(() => {
        res.redirect('/shahporan/admin/events-management');
    })
})

// POST route for denying an event
app.post('/shahporan/admin/delete-room', async (req, res) => {
    const roomID = req.body.deleteRoomButton;

    roomController.deleteRoom(roomID)
    .then(() => {
        res.redirect('/shahporan/admin/events-management');
    })
})

// POST route for making user an admin
app.post('/shahporan/admin/make-admin', async (req, res) => {
    const userID = req.body.adminButton;

    authController.makeAdmin(userID)
    .then(() => {
        res.redirect('/shahporan/admin/user-management');
    })
})

// POST route for making user an admin
app.post('/shahporan/admin/remove-admin', async (req, res) => {
    const userID = req.body.unadminButton;

    authController.removeAdmin(userID)
    .then(() => {
        res.redirect('/shahporan/admin/user-management');
    })
})

// POST route for activating a user
app.post('/shahporan/admin/activate-user', async (req, res) => {
    const userID = req.body.activateButton;

    authController.activateUser(userID)
    .then(() => {
        res.redirect('/shahporan/admin/user-management');
    })
})

// POST route for deactivating a user
app.post('/shahporan/admin/deactivate-user', async (req, res) => {
    const userID = req.body.deactivateButton;

    authController.deactivateUser(userID)
    .then(() => {
        res.redirect('/shahporan/admin/user-management');
    })
})

// POST route for deleting a user
app.post('/shahporan/admin/delete-user', async (req, res) => {
    const userID = req.body.deleteButton;

    authController.deleteUser(userID)
    .then(() => {
        res.redirect('/shahporan/admin/user-management');
    })
})

// POST route for editing an announcement
app.post('/shahporan/admin/edit-announcement', async (req, res) => {
    const announceID = req.body.editID;
    const newTitle = req.body.newTitle;
    const newContent = req.body.newContent;

    announcementController.edit(announceID, newTitle, newContent)
    .then(() => {
        res.redirect('/shahporan/admin/announcement-management');
    })
})

// POST route for adding an announcement
app.post('/shahporan/admin/add-announcement', async (req, res) => {
    const title = req.body.addTitle;
    const content = req.body.addContent;

    announcementController.add(title, content)
    .then(() => {
        res.redirect('/shahporan/admin/announcement-management');
    })
})

// Serve files from public folder
app.use(express.static('./public'));

// 404 page
app.use((req, res) => {
    res.status(404).render('pages/404');
})
