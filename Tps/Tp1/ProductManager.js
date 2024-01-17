class ProductManager {

    constructor(){
        this.products = []
        this.id = 0
    }

    addProduct(title, description, price, thumbnail, stock){

        if (!title| !description| !price| !thumbnail | !stock){
            return console.log('error')
        }

        const Product = {
            title, 
            description, 
            price, 
            thumbnail, 
            code: this.id, 
            stock
        }
        
        this.id=this.id + 1

        this.products.push(Product)
    }

    getProduct(){
        return this.products
    }

    getProductByID(id){
        if ( this.products.some((el)=>{el.code==id}) ){
            return this.products.find((el)=>{el.code==id})
        } else {
            return console.log('Not Found')
        }
    }
}

ProductManager()