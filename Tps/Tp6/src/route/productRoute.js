import { Router } from "express"
import productModel from "../models/productsModel.js"

const route = Router()


route.get( '/', async (req, res) => {

    try {
        const Prods = await productModel.find()
        const productsData = Prods.map(product => {
            return {
                title: product.title,
                description: product.description,
                price: product.price
            };
        });

        res.status(200).render('index', {
            Product: productsData,
            style:'index.css'
        })
        
    } catch(e) {
    
        res.status(400).send({
            message: e.message
        })
    }

})


export default route