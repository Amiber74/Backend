import { Router } from "express"
import productModel from "../models/productsModel.js"

const route = Router()

route.get('/', async (req, res)=>{

    let page = parseInt(req.query.page)
    if(!page){
        page=1
    }

    let result = await productModel.paginate({}, {page, limit:5, lean:true})

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}`: ''
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}`: ''
    result.isValid = !( page <=0 || page >result.totalPages)
    result.title= 'Productos: '
    result.style = 'index.css'
    res.render('index', result)
})


export default route