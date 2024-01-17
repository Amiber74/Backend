import Router from "express";
import CartManager from '../CartManager.js'

const CM = new CartManager('./cart.json')
const router = Router()

router.post('/', (req, res) => {
    res.status(200).send(CM.NewCart())
})

router.get('/:cid', (req, res)=>{
    const CID = parseInt(req.params.cid)

    const Result = CM.getCartById(CID).products
    res.status(200).send(Result)
})

router.post ('/:cid/product/:pid', (req, res)=>{
    const CID = parseInt(req.params.cid)
    const PID = parseInt(req.params.pid)

    const Result = CM.addProductCart(CID, PID)
    res.status(200).send(Result)
})

export default router