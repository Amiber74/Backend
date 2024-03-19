import { Router } from "express";
import productServices from '../services/productServices.js'

const PS = new productServices()
const route = Router()

route.get('/', (req, res) => {
    res.redirect('/home')
})

route.get('/home', (req, res) => {
    res.render('home')
})

route.get('/profile', async (req, res) => {
    const prods = await PS.getAllProducts()

    res.render('profile', {Products:prods})

})

export default route