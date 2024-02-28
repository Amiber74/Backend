import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import __dirname from './util.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set( 'view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))



app.use(cookieParser('CoderS3cR3tC0d3 '))

app.use('/setCookie', (req, res) => {
    res.cookie('CoderCookie', 'informacion de la cookie', {maxAge:5000,signed:true}).send('Cookie')

})

app.use('/getCookie', (req, res) => {

    res.send(req.cookies)

})

app.use('/deleteCookie', (req, res) => {

    res.clearCookie('CoderCookie').send('Cookie Removed')

})













app.listen(8080, ()=>{
    console.log('Servidor levantado en el puerto 8080')
})