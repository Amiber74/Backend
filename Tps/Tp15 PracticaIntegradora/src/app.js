//Importaciones
import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import flash from 'connect-flash'
    //Herramientas
import __dirname from './utils/dirname.js'
import { logger, addLogger } from './utils/loggers.js'
    //Rutas
import viewRoute from './routes/viewRouter.js'
import userRoute from './routes/userRouter.js'
import productRoute from './routes/productRouter.js'
import cartRoute from './routes/cartRouter.js'

const app = express()

//Configuraciones
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './../public'))

app.use(cookieParser('CookiSecret'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/Tp15',
        ttl:15
    }),
    secret: 'SecretMongo',
    resave:true,
    saveUninitialized:true
}))
mongoose.connect('mongodb://127.0.0.1:27017/Tp15')

//Herramientas
app.use(flash())
app.use(addLogger)

//Rutas
app.use('/', viewRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)

const PORT = 8080
app.listen(PORT, () => {
    logger.info(`Servidor levantado en el puerto ${PORT}`)
})