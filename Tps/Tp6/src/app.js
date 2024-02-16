import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import __dirname from './utils.js'

import ProductRoute from './route/productRoute.js'
import CartRoute from './route/cartRoute.js'
import ChatRoute from './route/chatRoute.js'

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/eccomerce')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set( 'view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))

app.use('/ping', (req, res) => {
    res.send('pong')
})
app.use('/api/product', ProductRoute)
app.use('/api/cart', CartRoute)
app.use('/api/chat', ChatRoute)

app.listen(8080, ()=>{
    console.log('Servidor levantado en el puerto 8080')
})