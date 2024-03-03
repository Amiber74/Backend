import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils/dirname.js'

const app = express()








app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set( 'view engine', 'handlebars')
app.use( express.static(__dirname + '/public'))






app.listen(8080,  () => {
        console.log('Servidor levantado en el puerto 8080')
    })