import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import compression from 'express-compression'

import config from './config/config.js'
import __dirname from './utils/dirname.js'

import MockingRouter from './routes/mockingRoute.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './../public'))

app.use(cookieParser(config.secretCookie))

app.use(compression())

app.use(session({
    store:MongoStore.create({
        mongoUrl: config.mongoUrl,
        ttl: 15
    }),
    secret: config.secretMongo,
    resave:true,
    saveUninitialized:true
}))

app.use('/', MockingRouter)

mongoose.connect(config.mongoUrl)

app.listen(config.port, () => {
    console.log('Servidor levantado en el puerto ' + config.port)
})
