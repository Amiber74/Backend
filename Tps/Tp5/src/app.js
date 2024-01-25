import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import __dirname from './utils.js'

import viewRouter from './routes/viewRouter.js'

const app = express()

const httpServer = app.listen(8080, ()=> {
    console.log('Server running in port 8080')
})

const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine ('handlebars', handlebars.engine()) 
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use('/', viewRouter)

const Products = [
    {name: "test1", code: 1, price: 1, stock:1 },
    {name: "test2", code: 2, price: 2, stock:2 }
]

socketServer.on('connection', socket => {
    console.log('Cliente nuevo');

    socket.on('Product', data =>{
        console.log(data);
        Products.push(data)
        socket.emit('Prod', Products)
    })

    socket.on('Remove', data => {
        console.log(data)
        Products.forEach(el => {
            if(el.code == data){
                Products.splice(Products.indexOf(el), 1)
                console.log(Products);
                socket.emit('Prod', Products)
                
            }
        })
    })

    socket.emit('Prod', Products)

})

