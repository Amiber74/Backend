import cartModel from "../models/cartModel.js";
import productManager from "./productsManager.js";

const PM = new productManager()

class CartManager {
    async NewId (){
        
        let result = Math.floor(Math.random() * 1000)

        try{    
            return result
        }catch(e){
            console.error(e.message)
        }
    }

    async newCart(){
        
        try {
            const cart = {
                id: this.NewId(),
                products: []
            }
            const result = cartModel.create(cart)
            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async getProductsCart (idCart){
        const Cid = Number(idCart)

        try {
            const res = await cartModel.find({id:Cid})
            
            return {
                status: 200,
                Result:res.products
            }

        } catch(e) {
        
            return {
                message:e.message,
                status: 400
            }
        }
    }

    async getCarts(){

        try {
            const result = await cartModel.find()
            return {
                status: 200,
                Result: result
            }
            
        } catch(e) {
        
            console.error(e.message)
            return []
        }

    }

    async getCartById(idCart){
        const Cid = Number(idCart)

        try {
            const res = await cartModel.find({id:Cid}).populate('products.prod')
            
            return {
                status: 200,
                Result:res
            }

        } catch(e) {
        
            return null
        } 

    }

    async AddProduct(Cid, pid, Quantity) {
        const Cart = await this.getCartById(Cid);
        String(pid)
        
        Cart.products.push(pid)
        
        try {
            const result = await CartModel.updateOne({ id: Cid }, Cart)
            return result;
        } catch (e) {
            console.error(e.message);
        }
    }

    async RemoveProduct (Cid, pid){
        try  {
            const Cart = await this.getOneCart(Cid)
            
            const Products = Cart.products
            
            const NewProducts = Products.filter(prod => prod.IdProduct != pid)

            Cart.products = NewProducts

            const result = await cartModel.updateOne({_id:Cid}, Cart)

            return {
                status:200,
                message: result
            }
        } catch (e){
            console.error(e.message)
        }
    }

    async RemoveProducts (Cid, pid){
        try  {
            const Cart = await this.getOneCart(Cid)

            Cart.products = []

            const result = await cartModel.updateOne({_id:Cid}, Cart)

            return {
                status:200,
                message: result
            }
        } catch (e){
            console.error(e.message)
        }
    }


    async updateProduct (Cid, pid){
        try {

            const Cart = await this.getCartById(Cid)

            const Products = Cart.products

            Products.forEach(prod => {
                if (prod.Product._id == pid ){
                    prod.Quantity = Quantity
                }
            });
        
            const result = await cartModel.updateOne({_id:Cid}, Cart)
            return result
        } catch(e) {
        
            console.error(e.message)
        }


    }

    async RemoveById (Cid){

        try {
            String(Cid)
            const result = await cartModel.findByIdAndDelete({code:Cid})
            const carts = await this.getCarts()
            return {
                carts,
                result
            }
        } catch(e) {
        
            console.error(e.message)
        }
    
    }
}

export default CartManager