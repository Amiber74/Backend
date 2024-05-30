import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import __dirname from '../utils/dirname.js'
import { Router } from 'express'

const route = Router()

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:'Documentacion de Tp16',
            description: 'Uso de Swagger en la API'
        }
    },
    apis:[`${__dirname}/../../docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)

route.get('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

export default route