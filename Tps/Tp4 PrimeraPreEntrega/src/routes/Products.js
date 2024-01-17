import Router from "express"
import ProductManager from '../ProductManager.js'

const PM = new ProductManager('./product.json')
const router = Router()


router.get('/', (req, res)=>{
    const Products = PM.getProducts()

    const limit = parseInt(req.query.limit || Products.length)
    
    const Result = Products.slice(0,limit)

    res.status(200).send(Result)
})

router.get('/:pid', (req, res) => {
    const PID = parseInt(req.params.pid)

    const Product = PM.getProductById(PID)

    res.status(200).send(Product)
})

router.post('/', (req, res)=>{
    const {title, description, price, thumbnail, code, stock} = req.body

    const Result = PM.addProduct(title, description, price, thumbnail, code, stock)

    res.status(200).send(Result)
})

router.put('/:pid', (req,res)=>{
    const PID = parseInt(req.params.pid)
    const campo = req.body
    const Result = PM.updateProduct(PID,campo)

    res.status(200).send(Result)
})

router.delete('/:pid', (req, res) => {
    const PID = parseInt(req.params.pid)
    const Result = PM.deleteProduct(PID)

    res.status(200).send(Result)
})

export default router