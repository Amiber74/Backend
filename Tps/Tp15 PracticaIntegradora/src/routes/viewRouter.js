import { Router } from "express";
import { productServices } from "../services/productServices.js";
import { userServices } from "../services/userServices.js";
import moment from "moment";
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

route.get('/changePass', (req, res) => {
    const email = req.query.email || false
    if(!req.cookies['limitPass']){
        const limit = moment().add(1, 'h').format('HH:mm')
        const formatLimit =  String(limit.replace(':',''))
        res.cookie('limitPass', formatLimit)
    }
    const limit = moment(req.cookies['limitPass'],'HH:mm').format('HH:mm')
    const now = moment().format('HH:mm')
    if(moment(now,'HH:mm').isAfter(moment(limit,'HH:mm'))){
        res.clearCookie('limitPass')
        res.redirect('/home?err=true')
    }
    
    res.render('changePass',{status:email})
})

export default route