import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
        type: Number,
        required: true
    } 
})

const productModel = mongoose.model('products', productSchema)
export default productModel