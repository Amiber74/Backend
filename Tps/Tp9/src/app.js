import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passportConfig.js'
import passport from 'passport'
import __dirname from './utils/dirname.js'


import viewRouter from './routes/viewsRouter.js'
import sessionRouter from './routes/sessionsRouter.js'
import passportRouter from './routes/passportRouter.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/../views')
app.set('view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))

app.use(cookieParser())
initializePassport()
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/Tp9',
        ttl:15
    }),
    secret: "PrahsEs3Cr37",
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', viewRouter)
app.use('/api/session', sessionRouter)
app.use('/api/passport', passportRouter)


mongoose.connect('mongodb://127.0.0.1:27017/Tp9')

app.listen(8080, ()=>{
    console.log('Servidor levantado en el puerto 8080')
})