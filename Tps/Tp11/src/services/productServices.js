import productModel from "../models/productsModel.js"

class productServices {

    async getAllProducts (){
        try {
            const result = await productModel.find().lean()
            return result
            
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async getOneProduct (Pid){
        const code =Number(Pid)
        try{    
            const result = await productModel.findOne({code:code}).lean()
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

        const prod = await this.getOneProduct(code)

        if(prod){
            return 'ERROR: codigo ya existente'
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

    async UpdateProduct (Pid, product){
        const pid = Number(Pid)

        const {tittle,description,code,price} = product

        if(!tittle || !description || !code || !price){
            return 'ERROR: Campos incompletos'
        }

        const prod = await this.getOneProduct(code)

        if(!prod){
            return 'ERROR: codigo inexistente'
        }

        try{
            const result = await productModel.updateOne({code:pid},product)
            return result
    
        }catch(e){
            console.error(e.message)
            return 'Error al actualizar producto'
        }
    }

    async DeleteProduct (Pid){
        const code =Number(Pid)

        try{
            const result = await productModel.deleteOne({code:code})
            
            return result
        }catch(e){
            console.log(e.message)
            return 'error al eliminar producto'
        }

    }
}

export default productServices