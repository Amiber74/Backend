import { Router } from "express";
import passport from "passport";

const route = Router()

route.post('/register', passport.authenticate('register', {failureRedirect:'/api/passport/failRegister'}), async (req, res) => {

    res.send('registro exitoso')

})

route.get('/failRegister', async (req, res) => {

    res.send('Registro fallido')

})

route.post('/login', passport.authenticate('login', {failureRedirect:'/api/passport/failLogin'}), async (req, res) => {

    res.send('Logeo existoso')

})

route.get('/failLogin', async (req, res) => {

    res.send ( 'logeo Fallido')

})


export default route