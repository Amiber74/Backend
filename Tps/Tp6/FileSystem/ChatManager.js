import fs from 'fs'
fs.promises

class ChatManager{

    constructor(path){
        this.path = path
        this.chat = []
    }

    async getChat (){
        try {
            
            let res = JSON.parse( await fs.readFile(this.path, 'utf-8'))
            
            return res
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async newMessage (msg, user){


        if (!msg || !user){
            return console.log('Valores incompletos')
        }

        const Message = {user, msg}

        try {
            
            const Chat = await this.getChat()

            Chat.push(Message)
            
            await fs.writeFile(this.path, JSON.stringify(Chat, null, '\t'))

            return {
                status: 200,
                Result: Chat
            }
            

        } catch(e) {
        
            console.error(e.message)
        }
    }

}

export default ChatManager