import { logger } from "../utils/loggers.js";
import {userServices} from "../services/userServices.js";
import { Router } from "express";
import { transport } from "../utils/transportEmail.js";

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
    const result = await US.createUser(firstName, lastName, email, password, phone)
    if(result){
        return res.status(201).redirect('/home')
    }else{
        res.status(500).redirect('/home?err=true')
    }
})

route.get('/logout', (req, res) => {
    res.clearCookie('user')
    res.redirect('/home')
})

route.get('/current', async (req, res) => {
    const user = await US.getUserDTO(req.cookies['user']) 
    res.json(JSON.stringify(user))
})

route.post('/updateRole', async (req, res) => {
    const user = await US.getUserDTO(req.cookies['user']) 
    await US.updateRole(user.email)
    res.redirect('/profile')
})

route.post('/sendEmail', async (req, res) => {
    const {email} = req.body
    if(email){
        await transport.sendMail({
            from: '<rojas.facundo2002@gmail.com>',
            to:email,
            subject:'Cambio de contraseña',
            html:`
                <div>
                    <h1>Cambio de Contraseña</h1>
                    <p>Para cambiar de contraseña haga click en el boton de ser caso contrario ignore este email</p>
                    <a href="http://localhost:8080/changePass/?email=true">
                        <button> Cambiar Contraseña </button>
                    </a>
                </div>
            `
        })
        res.redirect('/home')
    } else {
        res.redirect('/home?err=true')
    }
})

route.post('/changePass', async (req, res) => {
    const {emailUser, newPassword, repeatPassword} = req.body
    await US.updatePassword(emailUser, newPassword, repeatPassword)
    res.redirect('/home')
})  



export default route