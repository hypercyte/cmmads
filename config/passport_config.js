const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const Strategy = require('passport-local').Strategy

function init(passport, getUser) {
    const authenticateUser = async (username, password, done) => {
        const user = await getUser(username);

        if (!user.length) {
            return done(null, false, { message: "This username does not exist." });
        }

        try {
            if (await bcrypt.compare(password, user[0]['hash'])) {
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

    passport.use(new Strategy({ usernameField: 'username' }, authenticateUser))

    passport.serializeUser((user, done) => {
        return done(null, user[0]['ID']);
    })

    passport.deserializeUser((id, done) => {
        return done(null, getUserByID(id)); 
        // After shift, implement getUsrrBYID
    })
}

module.exports = init
