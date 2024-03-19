import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import flash from 'connect-flash'

import __dirname from './utils/dirname.js'
import initializePassport from './config/passportConfig.js'

import viewRouter from './routes/viewRouter.js'
import userRouter from './routes/userRouter.js'
import cartRouter from './routes/cartRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './../public'))

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/Tp10',
        ttl:15
    }),
    secret:'FraseSecreta',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
initializePassport()


app.use('/', viewRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)

mongoose.connect('mongodb://127.0.0.1:27017/Tp10')



app.listen(8080, ()=> {console.log('Servidor levantado en el puerto 8080')})