import { Router } from "express";
import passport from "passport";

const route = Router()

route.post('/register', passport.authenticate('register', {failureRedirect:'/api/user/failLink', failureFlash:true}), async (req, res) => {

    res.redirect('/profile')

})

route.post('/login', passport.authenticate('login', {failureRedirect:'/api/user/failLink', failureFlash:true,}), async (req, res) => {

    res.redirect('/profile')

})

route.get('/failLink', (req, res) => {
    let msg = req.flash('failMessages')
    
    if (!msg) msg = false
    if (msg.length == 0) msg = 'Campo/s Incompletos'

    res.render('fail', {err:msg})
})


export default route