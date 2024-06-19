import passport from "passport";
import googlePassport from 'passport-google-oauth20'
import config from "./config.js";
import { userModel } from "../models/userModel.js";

const Strategy = googlePassport.Strategy


const initializeGoogle = () => {
    passport.use('google', new Strategy({
            clientID: '195027503596-invon1b0s4uos5cibbaccgt9ks8pe0k1.apps.googleusercontent.com',
            clientSecret: config.googleClientSecret,
            callbackURL: 'http://localhost:8080/api/user/auth/google/callback',
        },
        async function(accessToken, refreshToken, profile, done){
            try {
                
                const user = await userModel({id:profile.id})
                if(user) return done(null, user)

                const newUser = await userModel.create({
                    firstName : profile._json.given_name,
                    lastName : profile._json.family_name,
                    id : profile.id,
                    email : profile._json.email,
                    password : ' ',
                    phone : ' ',
                    avatar : profile._json.picture
                })

                return done(null, newUser)
            } catch(err) {
                return done('Error al loguearse con Google')
            }
        }

    ))

    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser( async (id, done) => {
        const user = userModel.findById(id)
        done(null, user)
    })
}

export default initializeGoogle