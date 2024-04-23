import winston from 'winston'
import moment from 'moment'

const winstonColors ={
    fatal: 'red',
    error: 'orange', 
    warn: 'yellow',
    info: 'gray',
    debug: 'white'
}

export const logger  = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "http",
            format: winston.format.combine(
                winston.format.colorize({colors:winstonColors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './error.log',
            level:'warn',
            format: winston.format.simple()
        })
    ]
})
//let acum = 0
export const addLogger = (req, res, next) => {
    //acum = acum + 1
    req.logger = logger
    req.logger.http(` Peticion tipo '${req.method}' en '${req.url}' fecha: ${moment().format('DD-MM-YYYY HH:mm:ss')} `)
    next()
}