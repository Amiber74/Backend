import passport from 'passport'
import local from 'passport-local'
import userService from '../services/userService.js'
import { isValidPassword } from '../utils/bcrypt.js'

const US = new userService()
const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req, username, password, done) => {
            const {firstName, lastName, email, age} = req.body

            if(!firstName || !lastName || !email || !age){
                console.log('Faltan valores')
                return done(null, false)
            }

            const user = await US.UserByEmail(username)
            if(user){
                console.log('Usuario ya existente');
                return done(null, false)
            }

            const result = await US.newUser(firstName, lastName, age, email, password)

            return done(null, result)
        }
    ))

    passport.use('login', new LocalStrategy(
        {usernameField:'email'}, async (username, password, done) => {

            console.log('Entro a la estrategia')

            const user = await US.UserByEmail(username)

            if(!user){
                console.log('Usuario no registrado')
                return done(null, false)
            }

            if(!isValidPassword(user, password)){
                console.log('Contraseña incorrecta')
                done(null, false)
            }
        

            return done(null, user)
        
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

export default initializePassport