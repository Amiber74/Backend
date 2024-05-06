import userModel from '../models/userModel.js'
import userDTO from './DTOs/userDTO.js'
import {createHash, isValidPassword} from '../utils/bcrypt.js'
import { logger } from '../utils/loggers.js'
import {DBerror, ValidationError, DuplicateEmailError, UserNotFoundError, InvalidPasswordError, InvalidCredentialsError, userDtoNotFoundError, HandleError} from './errs.js' 

export class userServices{
    async createUser(firstName, lastName, email, pass, phone='', role='user'){
        try {
            if(!firstName|| !lastName|| !email|| !pass){
                throw new ValidationError ('Campos incompletos')
            }
            const users = await this.getUserByEmail(email)
            if(users){
                throw new DuplicateEmailError(`El email ${email} ya existe`)
            }
            const newUser = {firstName, lastName, fullName:firstName+lastName, email, password:createHash(pass) ,phone, cart:[], role }
            const result = (await userModel.create(newUser)).save()
            return result
        } catch(err) {
            HandleError(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // }else if (err instanceof DuplicateEmailError){
            //     logger.error(`Error: ${err.message}`)
            // }else{
            //     logger.error(`Error inesperado: ${err.message}`)
            // }
        }
    }

    async getUserByEmail(email){
        try {
            if(!email){throw new ValidationError ('Campo incompleto')}
            const result = await userModel.findOne({email:email}).lean()
            if(!result){new UserNotFoundError('Email no encontrado')}
            return result
        } catch(err) {
            HandleError(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // } else if (err instanceof UserNotFoundError){
            //     logger.error(`Error:${err.message} ` )
            // } else {
            //     logger.error(`Error inesperado: ${err}`)
            // }
        }

    }

    async getUserById(Id){
        try {
            if(!Id){throw new ValidationError ('Campo incompleto')}
            const result = await userModel.findOne({_id:Id}).lean()
            if(!result){new UserNotFoundError('Id no encontrado')}
            return result
        } catch(err) {
            HandleError(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // } else if (err instanceof UserNotFoundError){
            //     logger.error(`Error:${err.message} ` )
            // } else {
            //     logger.error(`Error inesperado: ${err}`)
            // }
        }

    }

    async getUserDTO(email){
        try {
            if(!email){throw new ValidationError ('Campo incompleto')}
            const user = (await userModel.findOne({email:email}).lean())
            if(!user){new UserNotFoundError('Email no encontrado')}
            const result = userDTO(user)
            if(!result){new userDtoNotFoundError('DTO no creado')}
            return result
        } catch(err) {
            HandleError(err)
        }
    }

    async getAllUser(){
        try {
            const result = await userModel.find().lean()
            if(result.length===0) {logger.error('No se encontraron usuarios'); return []}
            if(!result) throw new DBerror(`Error en BD: ${result}`)
            return result
        } catch(err) {
            HandleError(err)
            // if(err instanceof DBerror){
            //     logger.error(`Error en BD: ${err.message}`);
            // }else{
            //     logger.error(`Error inesperado: ${err}`)
            // }
        }
    }

    async loginUser(email, password){
        try {
            if(!email || !password){throw new ValidationError ('Campos incompletos')}
            const user = await this.getUserByEmail(email)
            if(!user){throw new UserNotFoundError('Usuario no encontrado')}
            const pass = this.validPassword(user, password)
            if(!pass){throw new InvalidPasswordError('Contraseña Incorrecta')}
            return true
        } catch(err) {
            HandleError(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // }else if(err instanceof UserNotFoundError){
            //     logger.error(`Error: ${err.message}`)
            // }else if(err instanceof InvalidPasswordError){
            //     logger.error(`Error: ${err.message}`)
            // }else{
            //     logger.error(`Error inesperado: ${err.message}`)
            // }
        }
    }

    async validRole (email, role){
        try {
            const user = await userModel.findOne({email},{role:1}).lean()
            if(!user){throw new UserNotFoundError('Usuario no encontrado')}
            const result = role == user.role ? true : false
            if(!result){throw new InvalidCredentialsError('No cuenta con los permisos adecuados')}
            return result 
        } catch(err){
            HandleError(err)
            // if(err instanceof InvalidCredentialsError){
            //     logger.error(`Error: ${err.message}`)
            // } else if (err instanceof UserNotFoundError){
            //     logger.error(`Error: ${err.message}`)
            // }else{
            //     logger.error(`Error inesperado: ${err.message}`)
            // }
        }
    }

    validPassword(user, password){
        try {
            if(!user || !password){throw new ValidationError ('Campos incompletos')}
            const result = isValidPassword(user, password)
            if(!result){throw new InvalidPasswordError('Contraseña incorrecta')}
            return result
        } catch(err) {
            HandleError(err)
            
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // }else if(err instanceof UserNotFoundError){
            //     logger.error(`Error: ${err.message}`)
            // }else{
            //     logger.error(`Error inesperado: ${err.message}`)
            // }
        }
    }

    async updatePassword(email, newPassword){
        try {
            if(!email || !newPassword){throw new ValidationError ('Campos incompletos')}
            const user = await this.getByEmail(email)
            if(!user){throw new UserNotFoundError('Usuario no encontrado')}
            user.password = createHash(newPassword)
            const result = await userModel.updateOne({email}, user)
            return result
        } catch(err) {
            HandleError(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // } else if(err instanceof UserNotFoundError){
            //     logger.error(`Error: ${err.message}`)
            // }else{
            //     logger.error(`Error inesperado: ${err.message}`)
            // }
        }
    }
}

export default userServices