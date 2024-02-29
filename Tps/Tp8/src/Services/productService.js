import productModel from "../models/productModel.js";

class productService {
    
    async getProducts(){
        try {
            const result = await productModel.find().lean()
            return result
            
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async newProduct ( title, price, description, code){
        
        if (!title|| !price|| !description|| !code){
            return 'Campos incompletos'
        }

        try {
            const Prod = { title, price, description, code}

            const result = await productModel.create(Prod)
            return result
            
        } catch(e) {
            console.error(`Error al insertar producto: ${e.message}`)
        }
    }

}

export default productService