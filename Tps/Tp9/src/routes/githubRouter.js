import { Router } from "express";
import passport from "passport";

const route = Router()

route.get('/github', passport.authenticate('github', {scope:['user: email']}),
async (req, res) => {

    console.log(req.body)
    res.send('Todo salio bien :D')

})

route.get('/githubCallback', (req, res) => {
    res.send('calback de github')

})


export default route