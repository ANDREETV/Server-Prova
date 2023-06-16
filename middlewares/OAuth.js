const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const userModel = require('../endpoints/Auth');

const FacebookObj = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/oauth2/redirect/facebook'
}

let facebookCallBack = async function (accessToken, refreshToken, profile, cb) {

    const user = await userModel.findOne({email: profile.email});
    if (!user) {
        // Non ho utente salvato nel DB
        // Quindi lo salvo

        const saveUserDb = new userModel({
            ...profile,
        })

        saveUserDb.save()
        return cb(null, saveUserDb)
    }
    return cb(null, user)
}

passport.use(new FacebookStrategy(FacebookObj, facebookCallBack));

module.exports = FacebookStrategy