import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    owner:{
        type:String,
        default:0
    },
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    stock: {
        type:Number,
        required:true
    }
})

const productModel = mongoose.model('products', productSchema)
export default productModel