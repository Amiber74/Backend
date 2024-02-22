import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique:true,
        required: true
    },
    products: {
        type:Array,
        prod:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        default: []
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel