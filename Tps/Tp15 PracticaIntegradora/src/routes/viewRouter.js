import { Router } from "express";
import { productServices } from "../services/productServices.js";
import { userServices } from "../services/userServices.js";
import { logger } from "../utils/loggers.js";

const route = Router()
const PS = new productServices()
const US = new userServices()

route.get('/', (req, res) => {
    res.redirect('/home')
})

route.get('/home', (req, res) => {
    const err = req.query.err
    res.render('index', {
        title:'Eccomerce',
        err
    })
})

route.get('/profile', async (req, res) => {
    const user = await US.getUserById(req.cookies['user'])
    res.render('profile',{
        user,
        title:'Perfil',
        Products: await PS.getAllProducts(user.cart, user.email) || []
    })

})

export default route