import userModel from '../models/userModel.js'
import userDTO from './DTOs/userDTO.js'
import { cartServices } from './cartServices.js'
import {createHash, isValidPassword} from '../utils/bcrypt.js'
import { logger } from '../utils/loggers.js'
import {v4 as uuidv4} from 'uuid'
import {DBerror, ValidationError, DuplicateEmailError, UserNotFoundError, InvalidPasswordError, InvalidCredentialsError, userDtoNotFoundError, PasswordMismatchError, SamePasswordError, HandleErr} from './errors/userErr.js' 

const CS = new cartServices()

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
            if(email=='rojas.facundo2002@gmail.com') role='premium'

            const newUser = {firstName, lastName, fullName:firstName+' '+lastName, email, password:createHash(pass) ,phone, cart: await CS.newCart(), role }
            const result = (await userModel.create(newUser)).save() 
            return result
        } catch(err) {
            HandleErr(err)
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
            const result = await userModel.findOne({email}).lean()
            if(!result){throw new UserNotFoundError('Email no encontrado')}
            return result
        } catch(err) {
            HandleErr(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // } else if (err instanceof UserNotFoundError){
            //     logger.error(`Error:${err.message} ` )
            // } else {
            //     logger.error(`Error inesperado: ${err}`)
            // }
        }

    }

    async getUserById(id){
        try {
            if(!id){throw new ValidationError ('Campo incompleto')}
            const result = await userModel.findOne({_id:id}).lean()
            
            if(!result){throw new UserNotFoundError('Usuario no encontrado')}
            return result
        } catch(err) {
            HandleErr(err)
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // } else if (err instanceof UserNotFoundError){
            //     logger.error(`Error:${err.message} ` )
            // } else {
            //     logger.error(`Error inesperado: ${err}`)
            // }
        }

    }

    async getUserDTO(id){
        try {
            if(!id){throw new ValidationError ('Campo incompleto')}
            const user = await this.getUserById(id)
            if(!user){throw new UserNotFoundError('Email no encontrado')}
            const result = new userDTO(user)
            if(!result){throw new userDtoNotFoundError('DTO no creado')}
            return result
        } catch(err) {
            HandleErr(err)
        }
    }

    async getAllUser(){
        try {
            const result = await userModel.find({},{password:0}).lean()
            if(result.length===0) {logger.error('No se encontraron usuarios'); return []}
            if(!result) throw new DBerror(`Error en BD: ${result}`)
            return result
        } catch(err) {
            HandleErr(err)
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
            HandleErr(err)
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
            HandleErr(err)
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
            HandleErr(err)
            
            // if(err instanceof ValidationError){
            //     logger.error(`Error: ${err.message}`)
            // }else if(err instanceof UserNotFoundError){
            //     logger.error(`Error: ${err.message}`)
            // }else{
            //     logger.error(`Error inesperado: ${err.message}`)
            // }
        }
    }

    async updatePassword(email, newPassword, repeatPassword){
        try {
            if(!email || !newPassword|| !repeatPassword){throw new ValidationError ('Campos incompletos')}
            if(!repeatPassword==newPassword){throw new PasswordMismatchError('No coinciden las contraseñas')}
            const user = await this.getUserByEmail(email)
            if(!user){throw new UserNotFoundError('Email no encontrado')}
            if(isValidPassword(user, newPassword)){throw new SamePasswordError('Contraseña igual a la anterior')}
            const result = await userModel.findOneAndUpdate({email}, {password:createHash(newPassword)})
            return result
        } catch(err) {
            HandleErr(err)
        }

    }

    async updateRole(email){
        
        try {
            if(!email){throw new ValidationError ('Campo "email" incompleto')}
            const user = await userModel.findOne({email:email})
            if(!user){throw new UserNotFoundError('Usuario no encontrado')}
            if(user.role=='premium' || user.role=='user'){
                user.role=='premium' ? user.role='user' : user.role='premium'
                const result = await userModel.findOneAndUpdate({email}, {role:user.role})
                return result
            }
            return new InvalidCredentialsError('No cuenta con los permisos adecuados')
        } catch(err) {
            HandleErr(err)
        }
    }
}
