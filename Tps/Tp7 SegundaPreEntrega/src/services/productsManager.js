import productModel from "../models/productsModel.js";

class ProductDao{

    async getAllProducts() {

        try {
            const Result = await productModel.find()
            return Result
            
        } catch(e) {

            console.error(e.message)
            return []
        }
    }

    async getOneProduct (Pid){

        const Id = String(Pid)

        try{    
            const result = await productModel.find({_id:Id})
            return result
        }catch(e){
            console.error(e.message)
        }

    }

    async createProduct (product){
        const {tittle,description,code,price} = product

        if(!tittle|| !description|| !code|| !price){    
            return 'ERROR: Campos incompletos'
        }

        const newProduct ={ 
            tittle,
            description,
            code,
            price
        }

        try{
            const result = await productModel.create(newProduct)
            return result
        } catch (e){
            console.error(e.message)
            return 'Error al crear producto'
        }
    }
    async UpdateProduct (uid, product){
        const {tittle,description,code,price} = product

        if(!tittle || !description || !code || !price){
            return 'ERROR: Campos incompletos'
        }

        try{
            const result = await productModel.updateOne({_id:uid},product)
            return result
    
        }catch(e){
            console.error(e.message)
            return 'Error al actualizar producto'
        }
    }

    async DeleteProduct (uid){

        try{
            const result = await productModel.deleteOne({_id:uid})
            
            return {
                status: 200,
                message:result
            }
        }catch(e){
            res.render({
                message:e.message
            })
        }

    }

}

export default ProductDao