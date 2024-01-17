import express from 'express'
import RouterProducts from './routes/Products.js'
import RouterCart from './routes/Carts.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/products', RouterProducts)
app.use('/api/carts', RouterCart)


const port = 8080
app.listen(port , ()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
})