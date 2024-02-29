import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

const userModel = mongoose.model("users", UsersSchema);
export default userModel