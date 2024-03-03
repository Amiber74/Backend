import fs from 'fs'
fs.promises

class CartManager { 

    constructor (path){
        this.path = path,
        this.carts = [],
        this.id = 0
    }

    NewCart (){
        const Cart = {
            id:this.id,
            products:[]
        } 
        this.id = this.id++
        
        return Cart
    }

    async addProductCart (idCart, idProduct){

        const Carts = await this.getCarts()
        const Cart = await this.getCartById(idCart)


        try {
            const Product = Cart.products.find(el => el.ID === idProduct)
        
            if ( Product ){
                Product.quantity++
            } else {
                const pos = Carts.findIndex(Cart)
                Cart.products.push({ID:idProduct, quantity:1})
                
                Carts[pos] = {...Carts[pos], ...Cart}
            }
            
            await fs.writeFile(this.path, JSON.stringify(Carts, null, '\t'))
        } catch(e) {
        
            console.error(e.message)
        }



    }

    async getProductCart(idCart){
        const Carts = this.getCarts()

        if ( !Carts.some(el => el.id === idCart)){
            return {
                status:400,
                message: `El id:${ID} del carrito no existe`
            }
        }
    
        try {
            return {
                status: 200, 
                res:Carts.find(el=>el.id===idCart).products
            }
            
        } catch(e) {
        
            console.error(e.message)
        }

    }

    async getCarts (){
        try {
            
            let res = JSON.parse( await fs.readFile(this.path, 'utf-8'))
            
            return res
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async getCartById (ID){

        const carts = await this.getCarts()
        try {
            if( carts.some( el => el.id === ID) ){
                return carts.find( el => el.id === ID)
            } else {
                return {
                    status:400,
                    message: `El id ${ID} no existe`
                }
            }
            
        } catch(e) {
        
            console.error(e.message)
        }

    }
}

export default CartManager

