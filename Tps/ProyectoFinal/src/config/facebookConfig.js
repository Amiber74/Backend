import passport from "passport";
import facebookPassport from 'passport-facebook';
import config from "./config.js";

const Strategy = facebookPassport.Strategy

const initializeFacebook = () => {

    passport.use('facebook', new Strategy({
        clientID: '355398407281296',
        clientSecret: 'eb4c87bf73133ab3f00bbd6d7ebc7297',
        callbackURL: 'http://localhost:8080/api/user/auth/facebook/callback'
    }),
    function verify(accessToken, refreshToken, profile, done) {
        try {
            console.log(profile)
            return done(null, profile)
            
        } catch(err) {
            console.log(err)
            return done('Error al registrarse con facebook')
        }
    })
    
    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser( async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializeFacebook
