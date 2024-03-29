import usersModel from "../models/usersModel.js";
import crypt from 'crypto'

class userService {

    async UserByEmail(email){
        try {
            const result = await usersModel.findOne({email})
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

    async newUser(firstName, lastName, age, email, pass, role='usuario') {

        if(!firstName|| !lastName|| !age|| !email|| !pass){
            return 'Campos incompletos'
        }

        if(email == 'adminCoder@coder.com' && pass == 'adminCod3r123'){
            role ='admin'
        }
        const password = this.getHash(pass)
        try {
            const newUser = {firstName, lastName, role, age, email, password}

            const result = await usersModel.create(newUser)
            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async userByID(id) {
        try {
            const result = await usersModel.findOne({_id:id},{firstName:1, lastName:1, age:1, email:1,role:1}).lean();
            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    getHash ( password){
        return crypt.createHash('sha256').update(password).digest('hex')
    }

}

export default userService;
