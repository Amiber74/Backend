import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = mongoose.Schema({
    id:{
        type: Number,
        unique:true,
        required: true
    },
    Products: Array
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel