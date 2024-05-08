import { logger } from "../utils/loggers.js";
import {userServices} from "../services/userServices.js";
import { Router } from "express";

const route = Router()
const US = new userServices()

route.post('/login', async (req, res) => {
    const {email, password} = req.body
    const result = await US.loginUser(email, password)
    if (result){
        const user = await US.getUserByEmail(email)
        res.cookie('user', user._id)
        res.redirect('/profile')
    }else{
        res.redirect('/home?err=true')
    }
})

route.post('/register', async (req, res) => {
    const {firstName, lastName, email, password, phone} = req.body
    await US.createUser(firstName, lastName, email, password, phone)
    res.redirect('/home')
})

route.get('/logout', (req, res) => {
    res.clearCookie('user')
    res.redirect('/home')
})

route.post('/updateRole', async (req, res) => {
    const user = await US.getUserDTO(req.cookies['user']) 
    await US.updateRole(user.email)
    res.redirect('/profile')
})


export default route