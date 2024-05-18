import { logger } from "../../utils/loggers.js"

export class DBerror extends Error{
    constructor(message){
        super(message),
        this.name='DBerror'
    }
}

export class ValidationError extends Error{
    constructor(message){
        super(message),
        this.name='ValidationError'
    }
}

export class DuplicateEmailError extends Error{
    constructor(message){
        super(message),
        this.name='DuplicateEmailError'
    }
}

export class UserNotFoundError extends Error{
    constructor(message){
        super(message),
        this.name='UserNotFoundError'
    }
}

export class InvalidCredentialsError extends Error{
    constructor(message){
        super(message),
        this.name='InvalidCredentialsError'
    }
}

export class InvalidPasswordError extends Error{
    constructor(message){
        super(message),
        this.name='InvalidPasswordError'
    }
}

export class userDtoNotFoundError extends Error{
    constructor(message){
        super(message),
        this.name='userDtoNotFoundError'
    }
}
export class PasswordMismatchError extends Error{
    constructor(message){
        super(message),
        this.name='PasswordMismatchError'
    }
}
export class SamePasswordError extends Error{
    constructor(message){
        super(message),
        this.name='SamePasswordError'
    }
}



export const HandleErr = (err) => {
    switch (true){
        case err instanceof SamePasswordError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof PasswordMismatchError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof DBerror:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof ValidationError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof DuplicateEmailError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof UserNotFoundError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof InvalidCredentialsError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof InvalidPasswordError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        case err instanceof userDtoNotFoundError:
            logger.error(`Error en Usuarios: ${err.message}`)
            break
        default:
            logger.warn(`Error inesperado en Usuarios: ${err.message}`)
    }
}
