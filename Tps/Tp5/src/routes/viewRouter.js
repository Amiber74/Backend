import { Router } from "express";

const route = Router()

const Products = [
    {name: "test1", code: 1, price: 1, stock:1 },
    {name: "test2", code: 2, price: 2, stock:2 }
]

route.get('/home', (req, res)=> {
    res.render('home')
})

route.post('/home', (req, res)=>{
    const {name, price, code, stock} = req.body
    
    if(name && price && stock){
        Products.push({name, code, price, stock})
    } else {
        Products.forEach(prod => {
            if(prod.code == code){
                Products.splice(Products.indexOf(prod), 1)
            }
        })
    }

    res.render('home', {Products})
})

route.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProduct')
})

export default route