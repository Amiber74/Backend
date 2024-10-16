import cartModel from '../models/cartModel.js'

class cartServices{

    async newCart(){
        try {
            const cart = {
                products: []
            }
            const result = cartModel.create(cart)
            return result
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async getProductsCart (idCart){
        try {
            const res = await cartModel.findById(idCart)
            
            return res.products

        } catch(e) {
        
            return {
                message:e.message,
                status: 400
            }
        }
    }

    async getCarts(){

        try {
            const result = await cartModel.find().populate('products').lean()
            
            return result
            
        } catch(e) {
        
            console.error(e.message)
            return []
        }
    }

    async getCartById(idCart){
        try {
            const res = await cartModel.findById(idCart).populate('products')
            
            return res

        } catch(e) {
        
            console.log(e.message)
            return []
        } 

    }

    async AddProduct(cid, Pid, Quantity) {
        
        try {
            const cart = await this.getCartById(cid)
            
            if (!cart.products) {
                cart.products = [];
            } 

            cart.products.push(Pid)
            console.log(cart)
            const result = await cartModel.updateOne({_id:cid}, cart)
            
            return result
        } catch(e) {
            console.log('error')
            console.error(e.message)
        }
    }

    async RemoveOneProduct (Cid, pid){
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
            const code =Number(Cid)
            const result = await cartModel.findByIdAndDelete({_id:code})

            return result
        } catch(e) {
        
            console.error(e.message)
        }
    
    }
    
}

export default cartServices