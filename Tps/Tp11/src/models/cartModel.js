import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    }]
})

const cartModel = mongoose.model('carts', cartSchema)
export default cartModel