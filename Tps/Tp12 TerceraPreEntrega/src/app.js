import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import flash from 'connect-flash'

import __dirname from './utils/dirname.js'
import config from './config/config.js'
import initializeGithub from './config/githubConfig.js'

import viewsRouter from './routes/viewsRouter.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import userRouter from './routes/userRouter.js'
import ticketRouter from './routes/ticketRouter.js'
import githubRouter from './routes/gitHubRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './../public'))

app.use(cookieParser(config.cookieSecret))

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        ttl:15
    }),
    secret: config.mongoSecret,
    resave:true,
    saveUninitialized:true
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
// initializeGithub()

app.use('/', viewsRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/user', userRouter)
app.use('/api/ticket', ticketRouter)
// app.use('/api/github', githubRouter)

mongoose.connect(config.mongoUrl)

app.listen(config.port, () => {
    console.log(`Servidor levantado en el puerto ${config.port}`)
})