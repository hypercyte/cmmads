const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const Strategy = require('passport-local').Strategy

/**
 * This function initialises the passport functionality.
 * 
 * @param {passport} passport The passport module
 * @param { function(string) : Array.<Object> } getUser Function which will find the user by their user name
 * @param { function(string) : Array.<Object> } getUserByID Function which will find the user by their ID
 */
function init(passport, getUser, getUserByID) {
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
    })
}

module.exports = init
