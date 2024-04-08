import passport from 'passport'
import userService from '../services/userService.js'
import githubStrategy from 'passport-github2'

const US = new userService()

const initializeGithub = () => {
    
    passport.use('github', new githubStrategy({
        clientID: 'Iv1.be214427252b1c3a',
        clienteSecret: '963d23f295acf189281a0a8276f49a07ca420485',
        calbackURL: 'http://localhost:8080/api/github/githubCallback'
    },
    async (accessToken, refreshToken, profile, done) => {

        const user = profile

        if(user){
            console.log(user)
            return done(null, user)
        }
        return done (null, false)
    }

    // async (req, accessToken, refreshToken, profile, done) => {
    //     const {firstName, lastName='',email, age=0, password='' } = profile._json
    //     const user = US.UserByEmail(email)
    //     if(user){
    //         return done(null, false)
    //     }
    //     const result = await US.newUser(firstName, lastName, age, email, password)
    //     return done(null, result)
    // }
        
    ))

    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await US.getByID(id)
        done(null, user)
    })

}

export default initializeGithub
