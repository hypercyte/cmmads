const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const Strategy = require('passport-local').Strategy

function init(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = getUser(username);
        if (user == null) {
            return done(null, false, { message: "This username does not exist." });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: "The password is incorrect." })
            }
        }
        catch (err) {
            return done(err)
        }
    }

    passport.use(new Strategy({ usernameField: 'username' }), authenticateUser)
    passport.serializeUser((user, done) => {

    })
    passport.deserializeUser((id, done) => {
        
    })
}
