import passport from "passport"
import userService from "../services/userServices.js"
import githubStrategy from 'passport-github2'

const US = new userService()

const initializeGithub = () => {
    
    passport.use('github', new githubStrategy({
        clientID: 'Iv1.be214427252b1c3a',
        clienteSecret: '4157593bd6acc36e20f91d8319b7ac51e56f28b5',
        calbackURL: 'http://localhost:8080/api/github/githubCallback'
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const {firstName, lastName='',email, age=0, password='' } = profile._json
        const user = US.UserByEmail(email)
        if(user){
            return done(null, false)
        }
        const result = await US.newUser(firstName, lastName, age, email, password)
        return done(null, result)
    }

    ))

    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await US.userByID(id)
        done(null, user)
    })

}

export default initializeGithub
