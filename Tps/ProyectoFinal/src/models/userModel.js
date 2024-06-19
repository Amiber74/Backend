import mongoose from "mongoose";
import __dirname from "../utils/dirname.js";

const userSchema = new mongoose.Schema({
    id: String,
    avatar: {
        type:String,
        default: `${__dirname}/../public/img/profiles/default.js`
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    fullName: String,
    role:{ 
        type: String,
        enum:['user', 'premium', 'admin'],
        default:'user'
    },
    email: {
        type: String,
        index:true,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone:{
        type: String,
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'carts'
    },
    documents:[{
        name: String,
        reference: String
    }],
    lastConnection:{
        type: String,
        default: false
    }
});

export const userModel = mongoose.model('users', userSchema);
