import userServices from "../services/userService.js";
import { authorization } from '../utils/middleware.js'
import {Router} from "express";

const route = Router()
const US = new userServices()

const roleMiddleware = (role) => {
    return async (req, res, next) => {
        const id = req.cookies['user']
        if(!id){return res.status(401).send({error:'Unauthorized'})}
        const user = await US.getDtoUser(id)
        if(!(user.role==role)){return res.status(403).send({error:'Not Permissions'})}
        return next()
    }
} 

route.post('/register', async (req, res) => {
    const {firstName, lastName, email, password, phone} = req.body
    try {
        await US.createUser(firstName, lastName, email, password, phone)
        res.status(201).redirect('/home')
    } catch(err) {
        res.status(500).redirect('/home')
    }
})

route.post('/login', async (req, res) => {
    const {email, password} = req.body
    const result = await US.validUser(email, password)
    if(result){
        const user = await US.getByEmail(email)
        res.cookie('user', user._id)
        req.session.cart = user.cart
        res.redirect('/profile')
    }else{
        res.redirect('/home')
    }
})

route.get("/logout", (req, res) => {
    res.clearCookie('user')
    res.redirect('/home')
})

route.get('/current', authorization('admin'), async (req, res) => {
    const result = await US.getDtoUser(req.cookies['user'])
    res.send(result)
})

route.get('*', (req, res) => {
    res.redirect('/home')
})


export default route