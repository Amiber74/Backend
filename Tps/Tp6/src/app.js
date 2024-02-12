import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import __dirname from './utils.js'

import ProductRoute from './route/productRoute.js'

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/eccomerce')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set( 'view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))

app.use('/ping', (req, res) => {
    res.render('index')
})
app.use('/api/product', ProductRoute)

app.listen(8080, ()=>{
    console.log('Servidor levantado en el puerto 8080')
})