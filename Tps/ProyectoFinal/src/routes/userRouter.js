import {Router} from 'express'
import passport from 'passport'
import { userController } from '../controller/userController.js'
import { uploader } from '../utils/multer.js'

const route = Router()
const controller = new userController()


route.post('/login', controller.controllerLoginUser)

route.post('/register', controller.controllerRegister)

route.get('/logout', controller.controllerLogout)

route.get('/current', controller.controllerCurrent)

route.post('/updateRole', controller.controllerRole)

route.post('/changePass', controller.controllerChangePass)  

route.post('/sendEmail', controller.controllerSendEmail)

route.post('/profile', uploader.single('avatar'), controller.controllerProfileImage)

route.post('/document', uploader.array('document'), controller.controllerDocument)

route.get('/auth/google', passport.authenticate('google', {successRedirect: '/session', scope: ['profile', 'email'], failureRedirect: '/session' }))

route.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/session'}), (req, res) => {
    req.flash('info', 'Registro con google exitoso')
    res.redirect('/home')
})

route.get('/auth/facebook', passport.authenticate('facebook', {successRedirect:'/home', scope:'email', failureRedirect:'/session'}))

route.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/session'}), (req, res) => {
    req.flash('info', 'Registro con facebook exitoso')
    res.redirect('/home')
})


export default route