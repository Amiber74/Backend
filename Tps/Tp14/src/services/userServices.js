import userModel from '../models/userModels.js'
import {createHash, isValidPassword} from '../utils/bcrypt.js'
import { logger } from '../utils/logger_produccion.js'

export class userServices {

    async register(firstName, lastName, email, pass){
        try {
            if(!firstName|| !lastName|| !email|| !pass){
                return logger.error('Campos incompletos')
            }

            const newUser = {firstName, lastName, email, password:createHash(pass)}
            await userModel.create(newUser)
            return logger.info(`${firstName +' '+ lastName} se registro con el email: ${email}`)
        } catch(e) {
            logger.warn(e)
        }
    }

    async login(email, password){
        try {
            if(!email|| !password) {return logger.error('Campos incompletos')}

            const user = await userModel.findById({email})

            if(!user) {logger.error(`${email} no esta registrado`)}

            const pass = isValidPassword(user, password)

            if(!pass) {logger.error('Contraseña incorrecta')}

            return logger.info('Usuario logeado correctamente')
        } catch(e) {
            logger.warn(e)
        }
    }

}