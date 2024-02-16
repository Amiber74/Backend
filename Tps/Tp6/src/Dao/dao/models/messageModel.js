import mongoose from 'mongoose'

const messageCollection = 'messages'

const messageSchema = mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    msg: String
})

const messageModel = mongoose.model(messageCollection, messageSchema)
export default messageModel