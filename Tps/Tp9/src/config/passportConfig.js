import passport from 'passport'
import userService from '../services/userService.js'

const US = new userService()

const initializePassport = () => {

    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await US.userByID(id)
        done(null, user)
    })
}

export default initializePassport