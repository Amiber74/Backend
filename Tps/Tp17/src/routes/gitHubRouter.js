import { Router } from "express";
import passport from "passport";
const route = Router()

route.get('/register', passport.authenticate('github', {successRedirect: '/profile'}),
async (req, res) => {
})

route.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),
(res, req)=> {
    const {__dirname, username, name} = req.user
    req.session.user ={__dirname, username, name} 
    res.redirect('/')
}
)

export default route