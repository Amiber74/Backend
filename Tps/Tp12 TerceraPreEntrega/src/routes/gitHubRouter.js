import { Router } from "express";
import passport from "passport";
const route = Router()

route.get('/register', passport.authenticate('github', {}),
async (req, res) => {

    console.log(req.body)
    res.send('Todo salio bien :D')

})

route.get('/githubCallback', (req, res) => {
    res.send('calback de github')

})
export default route