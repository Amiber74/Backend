import userModel from '../models/userModel.js'
import { creatHash, isValidPassword } from "../utils/bcrypt.js";

class userServices {

    async newUser(firstName, lastName, age, email, pass) {

        
        if(!firstName|| !lastName|| !age|| !email|| !pass){
            return 'Campos incompletos'
        }

        try {
            const newUser = {firstName, lastName, email, age, password: creatHash(pass)}
            
            const result = await userModel.create(newUser)

            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async userByID(id) {
        try {
            const result = await userModel.findOne({_id:id}, {passsword:0}).lean();
            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    ValidPass ( user, passsword){
        try {
            const result = isValidPassword(user, passsword)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async UserByEmail(email){
        try {
            const result = await userModel.findOne({email:email})
            return result
            
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async ValidRole(role, email){
        try {
            const user = await userModel.findOne({email:email}, {role:1}).lean()
            
            const result = role == user.role ? true : false
            
            return result
        } catch(e) {
            console.error(e.message)
        }
    }
}

export default userServices
