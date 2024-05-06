import { logger } from "../utils/loggers.js"

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


export const HandleError = (err) => {
    switch (true){
        case err instanceof DBerror:
            logger.error(`Error: ${err.message}`)
            break
        case err instanceof ValidationError:
            logger.error(`Error: ${err.message}`)
            break
        case err instanceof DuplicateEmailError:
            logger.error(`Error: ${err.message}`)
            break
        case err instanceof UserNotFoundError:
            logger.error(`Error: ${err.message}`)
            break
        case err instanceof InvalidCredentialsError:
            logger.error(`Error: ${err.message}`)
            break
        case err instanceof InvalidPasswordError:
            logger.error(`Error: ${err.message}`)
            break
        case err instanceof userDtoNotFoundError:
            logger.error(`Error: ${err.message}`)
            break
        default:
            logger.warn(`Error: ${err.message}`)
            
    }
}