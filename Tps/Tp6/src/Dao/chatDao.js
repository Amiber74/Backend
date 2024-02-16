import chatModel from './dao/models/messageModel.js'

class ChatDao {

    async getAllMessage(){

        try {
        
            const result = await chatModel.find()
            return {
                status:200,
                Result: result
            }
            
        } catch(e) {
        
            return {
                status:400,
                message: e.message
            }
        }
    }

    async newMessage(msg){
        
        try {
            const {user} = msg
            if(!user){
                return 'Falta nombre de usuario'
            }
            
            const result = await chatModel.create(msg)
            return {
                status:200,
                Result: result
            }

        } catch(e) {
            
            return {
                status:400,
                message: e.message
            }
        }
    }

}

export default ChatDao