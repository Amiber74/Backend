import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

import config  from './config/config.js'
import __dirname from './utils/dirname.js'
import {logger, addLogger} from './utils/looger.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './../public'))

mongoose.connect(config.mongoUrl)

app.use(addLogger)

app.get('/operacion', (req, res) => {
    let acum = 0
    for (let i= 0; i<10000; i++){
        acum +=i*5
    }
    res.send({acum})
})

app.listen(config.port, ()=>{
    logger.info((`Servidor levantado en el puerto ${config.port}`))
})