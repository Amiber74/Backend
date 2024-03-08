import { Router } from "express";
import passport from "passport";

const route = Router()

route.post('/register', passport.authenticate('register',{failureRedirect: '/home'}), async (req, res) => {

    // res.send({status:'success', message: 'usuario registrado'})
    res.redirect('/home')
})

route.get('/failRegister', async (req, res) => {

    console.log('error');
    res.send({error:'Fail'})

})


route.post('/login', passport.authenticate('login', {failureRedirect:'/failLogin'}), async (req, res) => {
    console.log('Entro al route')
    res.redirect('/profile')

})

route.get('/failLogin', async (req, res) => {

    console.log('error');
    res.send({error:'Fail'})

})


export default route