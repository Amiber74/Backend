import winston from 'winston'

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
        debug: 'green'
    }
}

export const logger  = winston.createLogger({
    levels: CustomLogger.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors:CustomLogger.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './error.log',
            level:'error',
            format: winston.format.simple()
        })
    ]
})