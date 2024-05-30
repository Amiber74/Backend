import { Router } from "express";
import { productServices } from "../services/productServices.js";
import { logger } from "../utils/loggers.js";

const route = Router()
const PS = new productServices()

route.post('/newProduct', async (req, res) => {
    const {owner, title, description, price, stock} = req.body
    await PS.createProduct(owner, title, description, price, stock)
    res.redirect('/profile')
})

route.get('/delete/:pid/:email', async (req, res) => {
    await PS.deleteProduct(req.params.pid, req.params.email)
    res.redirect('/profile')
})

route.get('*', (req, res) => {
    res.redirect('/home')
})

export default route
