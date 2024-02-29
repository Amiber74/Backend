import express from "express"
import handlebars from 'express-handlebars';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import __dirname from './utils.js'

import sessionsRouter from "./routes/sessionsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + './../views')
app.set( 'view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))

app.use(cookieParser());
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/tp8',
        ttl:15,
    }),
    secret:"sd654khg1f3",
    resave:true,
    saveUninitialized:true
}))

app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/tp8');

app.listen(8080, () => {
    console.log("servidor levantado en el puerto 8080");
})

