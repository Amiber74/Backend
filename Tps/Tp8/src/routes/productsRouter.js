import { Router } from "express";
import productService from "../Services/productService.js";

const PS = new productService()
const route = Router()

route.post('/', async (req, res) => {
    const { title, price, description, code } = req.body

    await PS.newProduct(title, price, description, code)

})
export default route