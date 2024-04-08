import { Router } from "express";
import {authorization} from '../utils/middleware.js'
import productService from '../services/productServices.js'

const route = Router()
const PS = new productService()

route.post('/newproduct',authorization('admin'), async (req, res) => {
    const {title, description, price, stock} = req.body
    await PS.createProduct(title, description, price, stock)
    res.redirect('/profile')
})

route.put('/updateproduct/:pid',authorization('admin'), async (req, res) => {
    const newprod = req.body
    await PS.updateProduct(req.params.pid, newprod)
})

route.delete('/delete/:pid',authorization('admin'), async (req, res) => {
    await PS.deleteProduct(req.params.pid)
    res.redirect('/profile')
})

route.get('*', (req, res) => {
    res.redirect('/home')
})





export default route