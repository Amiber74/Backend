import passport from "passport"
import userService from "../services/userServices.js"
import githubStrategy from 'passport-github2'

const US = new userService()

const initializeGithub = () => {
    
    passport.use('github', new githubStrategy({
        clientID: 'Iv1.e04ce5fa66d1a6b5',
        clienteSecret: '54d7e742f87b21ba14894c188ec04705212d5162',
        calbackURL: 'http://localhost:8080/api/github/githubCallback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
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
