import { Router } from "express"
import ProdManager from '../services/productsManager.js'

const route = Router()
const PM = new ProdManager()

route.get( '/', async (req, res) => {
    
    const query = {}
    if (req.query.category) {
        query.category = req.query.category;
    }
    if (req.query.available !== undefined) {
        query.available = req.query.available === 'true';
    }
    
    const sortField = Object.keys(sort)[0]; // Extraer el primer campo de ordenación
    const sortDirection = sort[sortField] === 'asc' ? 1 : -1;
    const sortOptions = sortField ? { [sortField]: sortDirection } : {};

    const{limit=10, page=1, sort={}}= req.query
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOptions
    }
    

    let Result = await ProductModel.paginate({},options)

    const ResultMod = {
        status: 'success',
        payload: Result.docs,
        totalPages:Result.totalPages,
        prevPage:Result.prevPage,
        nextPage:Result.nextPage,
        hasPrevPage: Result.hasPrevPage,
        hasnextPage: Result.hasNextPage,
        prevLink:Result.prevLink = Result.hasPrevPage?`http://localhost:8080/studentes?page=${Result.prevPage}`:null,
        nextLink:Result.hasNextPage?`http://localhost:8080/?page=${Result.nextPage}`:null,
    }   
    res.send(ResultMod)

})

route.post('/', async (req, res) => {

    const Result  = await PM.createProduct(req.body)
    res.status(200).send({message: Result})
    
})


route.put('/:uid', async (req, res) => {
    const {uid} = req.params

    const Result = PM.UpdateProduct(uid, req.body)
    res.status(200).send({message: Result})

})

route.delete('/:uid', async (req, res) => {

    const {uid} = req.params

    const Result = PM.DeleteProduct(uid)
    
    return Result

})



export default route