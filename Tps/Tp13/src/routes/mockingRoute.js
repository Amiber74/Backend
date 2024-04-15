import { Router } from "express";
import mwError from '../utils/middlewareErr.js'
import mockingServices from '../services/mockingServices.js'

const MS = new mockingServices()
const route = Router()

class ProductNotFound extends Error(){}

route.get('/mockingproducts', (req, res) => {
    try {
        const result = MS.getProd()
        if(result){
            res.send({status:200, payload: result})
        }else{
            throw new ProductNotFound()
        }
    } catch(err) {
        mwError(err, req, res)
    }
})

export default route 