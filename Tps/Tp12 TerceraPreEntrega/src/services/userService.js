import userModel from '../models/userModel.js'
import cartServices from './cartService.js'
import userDTO from './DTOs/userDto.js'
import {createHash, isValidPassword} from '../utils/bcrypt.js'

const CS = new cartServices()

class userServices {

    async getDtoUser (id){
        try {
            const user = await this.getByID(id)
            const result = new userDTO(user)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async getAll(){
        try {
            const result = await userModel.find().lean()
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async createUser (firstName, lastName, email, pass, phone='', role = 'user'){
        try {
            if(!firstName|| !lastName||!email|| !pass){
                return 'Campos Incompletos'
            }

            if(email == 'admin@gmail.com'){
                role = 'admin'
            }
            
            const cart = await CS.newCart()
            
            const newUser = {firstName, lastName, email, password:createHash(pass), phone, cart, role}
            const result = await userModel.create(newUser)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async getByEmail (email){
        try {
            const result = await userModel.findOne({email:email},).lean()
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    validPass(user, password){
        try {
            const result = isValidPassword(user, password)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async validRole (role, id){
        try {
            const user = await userModel.findOne({_id:id},{role:1}).lean()
            const result = role == user.role ? true : false
            return result 
        } catch(e) {
            console.error(e.message)
        }
    }

    async validUser (email, password){
        try {
            const user = await this.getByEmail(email)
            if(!user){return false}
            
            const pass = this.validPass(user, password)
            
            if(!pass){
                return false
            }

            return true
        } catch(e) {
            console.error(e.message)
        }
    }

    async updatePassword(user, newPassword){
        try {
            if(!user ||!newPassword){
                return 'ERROR: campos incompletos'
            }
            const userExist = await this.getByEmail(user.email)
            if(!userExist){
                return 'ERROR: usuario inexistente'
            }
            user.password = createHash(newPassword)
            const result = await userModel.updateOne({email:user.email}, user)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async getByID(id){
        try {
            const result = await userModel.findOne({_id:id}, {password:0}).lean()
            return result
        } catch(e) {
            console.error(e.message)
        }
    }
}

export default userServices