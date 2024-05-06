import winston from 'winston'
import moment from 'moment'
// import config from '../config/config.js'

const CustomLogger ={
    levels:{
        fatal:0,
        error:1,
        warn:2,
        info:3,
        http:4,
        debug:5
    },
    colors: {
        fatal: 'red',
        error: 'black', 
        warn: 'yellow',
        info: 'blue',
        debug: 'green',
    }
}

// export let logger
export let logger = winston.createLogger({
    levels: CustomLogger.levels,
    transports: [
        new winston.transports.Console({
            level: "http",
            format: winston.format.combine(
                winston.format.colorize({colors:CustomLogger.colors}),
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

// switch (config.logger) {
//     case 'produccion':
//         logger = winston.createLogger({
//             transports: [
//                 new winston.transports.Console({
//                     level: "info",
//                     format: winston.format.combine(
//                         winston.format.colorize({colors:ColorLogger}),
//                         winston.format.simple()
//                     )
//                 }),
//                 new winston.transports.File({
//                     filename: './error.log',
//                     level:'error',
//                     format: winston.format.simple()
//                 })
//             ]
//         })
        
//         break;

//     case 'desarrollo':
//         logger = winston.createLogger({
//             levels: CustomLogger.levels,
//             transports: [
//                 new winston.transports.Console({
//                     level: "debug",
//                     format: winston.format.combine(
//                         winston.format.colorize({colors:ColorLogger}),
//                         winston.format.simple()
//                     )
//                 }),
//                 new winston.transports.File({
//                     filename: './error.log',
//                     level:'warn',
//                     format: winston.format.simple()
//                 })
//             ]
//         })
//         break;
// }

export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(` Peticion tipo '${req.method}' en 'localhost:8080${req.url}' fecha: ${moment().format('DD-MM-YYYY HH:mm:ss')}`)
    next()
}