import { Router } from "express"
import ProdDao from '../Dao/productsDao.js'

const route = Router()
const PD = new ProdDao()

route.get( '/', async (req, res) => {

    const Res = await PD.getAllProducts()
    const productsData = Res.map(product => {
        return {
            title: product.title,
            description: product.description,
            price: product.price
        };
    })

    res.status(200).render('index', {
        Product: productsData,
        style:'index.css'
    })
    
})

route.post('/', async (req, res) => {

    const Result  = await PD.createProduct(req.body)
    res.status(200).send({message: Result})
    
})


route.put('/:uid', async (req, res) => {
    const {uid} = req.params

    const Result = PD.UpdateProduct(uid, req.body)
    res.status(200).send({message: Result})

})

route.delete('/:uid', async (req, res) => {

    const {uid} = req.params

    const Result = PD.DeleteProduct(uid)
    
    return Result

})



export default route