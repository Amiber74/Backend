import passport from "passport";
import local from 'passport-local';
import userService from "../services/userServices.js";

const US = new userService()
const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req, username, password, done) => {
            
            const {firstName, lastName, age} = req.body
            if(!firstName || !lastName || !age){
                req.flash('failMessages', 'campo/s incompleto/s')
                return done(null, false, {message: 'Valores incompletos'})
            }

            const user = await US.UserByEmail(username)

            if(user){
                req.flash('failMessages', ' Usuario Existente')
                return done(null, false, {message:'Usuario Existente'})
            }

            const result = await US.newUser(firstName, lastName, age, username, password)

            return done(null, result)
        }
    ))

    passport.use('login', new localStrategy(
        {passReqToCallback:true, usernameField:'email' }, async(req, username, password, done) => {
            
            const user = await US.UserByEmail(username)

            if(!user){
                req.flash('failMessages', 'Usuario no registrado')
                return done(null, false, {message:'user no registrado'})
            }

            if(!US.ValidPass(user, password)){
                req.flash('failMessages', 'Password Incorrecto')
                return done(null, false, {message:'Password Incorrecto'})
            }

            return done(null, user, {message:'Usuario logeado con exito'})
        }
    ))


    passport.serializeUser( (user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser( async (id, done) => {
        const user = await US.userByID(id)
        return done(null,user)
    })
}

export default initializePassport