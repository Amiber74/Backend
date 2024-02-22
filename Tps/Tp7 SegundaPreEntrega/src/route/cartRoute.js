import { Router } from "express";
import CartManager from '../services/cartManager.js'

const route = Router()
const CM = new CartManager()

route.get('/', async (req, res) => {

    const Result = await CM.getCarts()

    res.status(200).send({message: Result})

})

route.get('/:id', async (req, res) => {

    const {id} = req.params

    const Result = await CM.getCartById(id)

    res.status(200).send(Result)
})

route.get('/carts/:cid', async (req, res) => {

    const {cid} = req.params
    
    const cart = CM.getCartById(cid)
    const Result = cart.product.map(product => {
        return {
            id:cid,
            title: product.title,
            description: product.description,
            price: product.price
        };
    })
    
    res.status(200).render('cart', {Result, style: 'cart.css'})
})

route.get('/product/:id', async (req, res) => {

    const {id} = req.params
    const Result = await CM.getProductsCart(id)

    res.status(200).send(Result)
})

route.post('/', async (req, res) => {

    const result = await CM.newCart()

    res.status(200).send(result)

})

route.post('/product/:cid/:pid', async (req, res) => {
    const {pid, cid} = req.params
    const quantity = req.body

    const Result = CM.AddProduct(cid, pid, quantity)
    
    res.status(200).send(Result) 

})

route.delete('/product/:cid/:pid', async (req, res) => {

    const {cid,pid} = req.params

    const Result = await CM.RemoveProduct(cid,pid)

    res.status(200).send(Result)

})

route.delete('/product/:cid/', async (req, res) => {

    const {cid} = req.params

    const Result = await CM.RemoveProducts(cid)

    res.status(200).send(Result)

})

export default route