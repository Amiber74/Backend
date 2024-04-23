import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

import UserRoute from './routes/userRouter.js'
import loggerRoute from './routes/loggerRouter.js'

import config  from './config/config.js'
import __dirname from './utils/dirname.js'
import {logger, addLogger} from './utils/logger.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './../public'))

mongoose.connect(config.mongoUrl)

app.use(addLogger)

app.use('/api/test', UserRoute)
app.use('/', loggerRoute)

const PORT = config.port || 8080
app.listen(PORT, ()=>{
    logger.info((`Servidor levantado en el puerto ${PORT}`))
})