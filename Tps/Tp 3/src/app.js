import express from "express"
import ProductManager from './ProductManager.js'

const PM = new ProductManager("./src/db.json")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get ('/ping', (req, res)=>{
    res.send('pong')
})

app.post('/addProduct', (req, res) => {

    PM.addProduct("Test", "Test", 0, "", 0, 0)
    const {title, description, price, thumbnail, code, stock} = req.body

    try {
        PM.addProduct(title, description, price, thumbnail, code, stock)

        res.send('Producto agregado')
        
    } catch(e) {
    
        console.error(e.message)
    }
})

app.get('/products',  (req, res) => {

    const limit = parseInt(req.query.limit)

    if( !limit ) {
        res.send(PM.getAllProducts())
    } else {
        const Lista = PM.getAllProducts().slice(0,limit)
        res.send(Lista)
    }

})

app.get('/products/:pid',  (req, res) => {

    const id = parseInt(req.params.pid)

    res.send(PM.getProductById(id))
})



const PORT = 8080
app.listen( PORT, ()=>{
    console.log(`Servidor levantado en el puerto ${PORT}, localhost:${PORT}/ping`)
})
