import { Router } from "express";
import cartServices from "../services/cartServices.js";

const CS = new cartServices()
const route = Router()

route.get('/', async (req, res) => {

    const result = await CS.getCarts()
    console.log(JSON.stringify(result,null,'\t'))
    res.send(result)
})

route.post('/addproduct/:cid/:pid', async (req, res) => {
    const {pid, cid} = req.params
    const quantity = req.body

    const Result = await CS.AddProduct(cid, pid, 1)
    
    res.status(200).send(Result) 

})

route.get('/:cid', async (req, res) => {

    const {cid} = req.params

    const result = await CS.getCartById(cid)
    
    console.log(result)
    res.send(result)
})


export default route