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
    fullName: {
        type: String
    },
    email: {
        type:String,
        required:true,
        unique: true,
        index:true
    },
    password:{ 
        type: String,
        required: true
    },
    phone:{
        type:String
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'carts'
    },
    role:{ 
        type: String,
        enum:['user', 'admin'],
        default:'user'
    }

})

const userModel = mongoose.model('users', userSchema)

export default userModel
