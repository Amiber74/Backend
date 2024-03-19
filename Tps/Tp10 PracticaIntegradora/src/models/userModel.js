import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    age:{
        type:Number,
        required: true
    },
    password:{ 
        type: String,
        required: true
    },
    cart:{
        type:Array,
        cart:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'carts'
        },
        default: []
    },
    role:{ 
        type: String,
        default:'user'
    }

})

const userModel = mongoose.model('users', userSchema)

export default userModel
