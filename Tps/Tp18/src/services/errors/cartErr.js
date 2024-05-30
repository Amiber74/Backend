import {logger} from '../../utils/loggers.js'

export class CartCreationError extends Error{
    constructor(message){
        super(message),
        this.name='CartCreationError'
    }
}
export class ValidationError extends Error{
    constructor(message){
        super(message),
        this.name='ValidationError'
    }
}
export class CartNotFoundError extends Error{
    constructor(message){
        super(message),
        this.name='CartNotFoundError'
    }
}
export class QuantityInvalidError extends Error{
    constructor(message){
        super(message),
        this.name='QuantityInvalidError'
    }
}


export const HandleErr = (err) =>{
    switch(true){
        case err instanceof QuantityInvalidError:
            logger.error(`Error en Productos: ${err.message}`)
            break;
        case err instanceof CartNotFoundError:
            logger.error(`Error en Productos: ${err.message}`)
            break;
        case err instanceof ValidationError:
            logger.error(`Error en Productos: ${err.message}`)
            break;
        case err instanceof CartCreationError:
            logger.error(`Error en Productos: ${err.message}`)
            break;
        default:
            logger.warn(`Error inesperado en Productos: ${err.message}`)
    }
}