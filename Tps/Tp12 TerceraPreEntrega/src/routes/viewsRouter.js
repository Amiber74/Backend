import { Router } from "express";
import productServices from "../services/productServices.js";
import userServices from "../services/userService.js";

const route = Router()
const PS = new productServices()
const US = new userServices()

route.get('/', (req, res) => {
    res.redirect('/home')
})

route.get('/home', async (req, res) => {
    if(req.cookies['user']){
        res.redirect('/profile')
    }else{
        res.render('home')
    }
})

route.get('/profile', async (req, res) => {
    const idCart = req.session.cart
    const user = await US.getDtoUser(req.cookies['user'])
    const role = user.role == 'admin' ? true : false
    const result = await PS.getAllProducts(idCart)
    res.render('profile', {Products:result, Cid: idCart, role})
})



export default route