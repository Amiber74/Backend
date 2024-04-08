import { Router } from "express";
import {authorization} from '../utils/middleware.js'
import cartServices from "../services/cartService.js";

const route = Router()
const CS = new cartServices()



route.post('/addproduct/:cid/:pid',authorization('user'), async (req, res) => {
    const {cid, pid }= req.params
    await CS.AddProduct(cid, pid, req.body.quantity)
    req.session.cart = cid
    res.redirect('/profile')
})

route.get('/:cid', async (req, res) => {
    const Carrito = await CS.getProductsCart(req.params.cid)
    res.render('carrito', {Carrito, CID:req.params.cid, user:req.cookies['user']})
})

route.get('*', (req, res) => {
    res.redirect('/home')
})



export default route