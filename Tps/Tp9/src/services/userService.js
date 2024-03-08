import usersModel from "../models/usersModel.js";
import { creatHash, isValidPassword } from "../utils/bcrypt.js";
// import crypt from 'crypto'

class userService {

    async UserByEmail(email){
        try {
            const result = await usersModel.findOne({email:email})
            return result
            
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async UserByCreds(email, password) {

        try {

            const result = await usersModel.findOne({email, password})
            
            return result
        } catch(e) {
        
            console.error(e.message)
        }

    }

    async newUser(firstName, lastName, age, email, pass) {

        if(!firstName|| !lastName|| !age|| !email|| !pass){
            return 'Campos incompletos'
        }

        try {
            const newUser = {firstName, lastName, age, email, password: creatHash(pass)}
            
            const result = await usersModel.create(newUser)

            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async userByID(id) {
        try {
            const result = await usersModel.findOne({_id:id},{firstName:1, lastName:1, age:1, email:1}).lean();
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

    // async getHash ( password){
    //     return crypt.createHash('sha256').update(password).digest('hex')
    // }

}

export default userService;
