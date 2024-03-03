import { Router } from "express";
import CartDao from '../Dao/cartDao.js'

const route = Router()
const CD = new CartDao()

route.get('/', async (req, res) => {

    const Result = await CD.getCarts()

    res.status(200).send({message: Result})

})

route.get('/:id', async (req, res) => {

    const {id} = req.params

    const Result = await CD.getCartById(id)

    res.status(200).send(Result)
})

route.get('/product/:id', async (req, res) => {

    const {id} = req.params
    const Result = await CD.getProductsCart(id)

    res.status(200).send(Result)
})

route.post('/', async (req, res) => {

    const result = await CD.newCart()

    res.status(200).send(result)

})

route.post('/product/:cid/:pid', async (req, res) => {
    const {pid, cid} = req.params
    const quantity = req.body

    const Result = CD.AddProduct(cid, pid, quantity)
    
    res.status(200).send(Result) 

})

route.delete('/product/:cid/:pid', async (req, res) => {

    const {cid,pid} = req.params

    const Result = await CD.RemoveProduct(cid,pid)

    res.status(200).send(Result)

})


export default route