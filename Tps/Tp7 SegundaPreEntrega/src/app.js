import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import __dirname from './util.js'

import ProductRouter from './route/productRoute.js'
import CartRouter from './route/cartRoute.js'
import ProductView from './route/productView.js'

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/Tp7')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set( 'view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))


app.use('/api/products', ProductRouter)
app.use('/api/carts', CartRouter)
app.use('/products', ProductView)

app.listen(8080, ()=>{
    console.log('Servidor levantado en el puerto 8080')
})