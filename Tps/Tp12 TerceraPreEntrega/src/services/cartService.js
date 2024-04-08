import cartModel from '../models/cartModel.js'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'

class cartServices {

    async newCart (){
        try {
            const newCart = {products:[]}
            const result = await cartModel.create(newCart)
            return result._id
        } catch(e) {
            console.error(e.message)
        }
    }

    async getProductsCart(codeCart){
        try {
            const result = await cartModel.findOne({_id: codeCart}, {stock:0}).populate({path:'products.product'}).lean()
            
            return result.products
        } catch(e) {
            console.error(e.message)
        }
    }

    async getCarts(){
        try {
            const result = await cartModel.find().lean()
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async getCartByCode(code){
        try {
            const result = await cartModel.findOne({_id: code}).lean()
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async AddProduct(Cid, Pid, quantity = 1){  
        try {
            if (quantity == ''){quantity=1}
            let cart = await this.getCartByCode(Cid)
            if(!cart){ cart.products=[] }
            cart.products.push({product:Pid, quantity})
            const result = await cartModel.updateOne({_id:Cid}, cart)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async RemoveOneProduct( codeCart, Pid){
        const code = String(codeCart)
        try {
            const Cart = await this.getCartByCode(code)

            const Products = Cart.products
            
            const NewProduct = Products.filter(prod => prod.id != Pid)

            Cart.products = NewProduct

            const result = await cartModel.updateOne({id:code}, Cart)

            return result

        } catch(e) {
            console.error(e.message)
        }
    }

    async RemoveProducts(CodeCart){
        const code = String(CodeCart)
        try {
            const cart = await this.getCartByCode(code)

            cart.products = []

            const result = await cartModel.updateOne({id:code}, cart)

            return result
            
        } catch(e) {
            console.error(e.message)
        }
    }

    async updateProduct (cid, products){
        try {
            const result = await cartModel.updateOne({_id:cid}, {products})
            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async RemoveByCode (codeCart){
        const code = String(codeCart)
        try {
            const result = await cartModel.deleteOne({id:code})

            return result
        } catch(e) {
            console.error(e.message)
        }
    }

}

export default cartServices