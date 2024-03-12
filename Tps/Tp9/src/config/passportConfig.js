import passport from 'passport'
import local from 'passport-local'
import userService from '../services/userServices.js'

const US = new userService()
const localStrategy = local.Strategy

const initializePassport = () =>{
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req, username, password, done) => {
            const {firstName, lastName, email, age} = req.body

            if(!firstName || !lastName || !email || !age){
                console.log('Faltan valores')

                return done(null, false)
            }

            const user = await US.UserByEmail(username)
            if(user){
                console.log('Usuario ya existente')
                return done (null, false)
            }

            const result = await US.newUser(firstName, lastName, age, email, password)
            return done(null, result)
        
        }
    ))

    passport.use('login', new localStrategy(
        {usernameField:'email', passReqToCallback:true},async (req, username, password, done) => {
            
            console.log(username)
            console.log(password)
            const user = await US.UserByEmail(username)

            if(!user){ 
                console.log('Usuario inexistente') 
                return done(null, false)
            }

            if(!US.ValidPass(user, password)){
                console.log('contraseña incorrecta')
                return done(null, false)
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

/*
passport.use('login', new localStrategy(
        {usernameField:'email'}, async (username, password, done) => {
            console.log(req.body);
            console.log(`user: ${username}, pass: ${password}`)
            console.log('Entro a la estrategia')
            
            const user = await US.UserByusername(email)

            if(!user){
                console.log('Usuario no registrado')
                return done(null, false, {message: 'No se encontro el usuario'})
            }

            if(!US.ValidPass(user, password)){
                console.log('contraseña incorrecta')
                return done(null, false)
            }

            return done(null, user)
        }
    ))
*/