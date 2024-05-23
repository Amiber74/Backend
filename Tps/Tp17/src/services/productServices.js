import productModel from '../models/productsModel.js'
import {v4 as uuidv4} from 'uuid'

class productServices {

    async getAllProducts (idCart='') {
        try {
            const result = await productModel.find().lean()
            result.map((prod) => prod.Cid =idCart )
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async getOneProduct (Pid){
        const code = String(Pid)
        try {
            const allProds = await this.getAllProducts()

            // if(allProds.length === 0) return 'Error: no hay productos en la base de datos'

            const result = await productModel.findOne({_id:code}).lean()
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async createProduct (title, description, price, stock){
        try {
            if(!title || !description || !price || !stock){
                return 'ERROR: campos incompletos'
            }
            const code = uuidv4()
            const newProduct = {title, description, price:Number(price), code, stock:Number(stock)}
            const result = await productModel.create(newProduct)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async updateProduct(pid, product){
        try {
            const Pid = Number(pid)
            const prod = await this.getOneProduct(Pid)
            if(!prod){return 'ERROR: codigo inexistente'}
            const newProd={...product, prod}
            const result = await productModel.updateOne({code: Pid},newProd)
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async deleteProduct (pid){
        try {
            const code = String(pid)
            const result = await productModel.deleteOne({id:code})
            return result
        } catch(e) {
            console.error(e.message)
        }
    }

    async updateStock(pid, quantity){
        try {
            const prod = await this.getOneProduct(pid)
            if(prod.stock < quantity){
                return {
                    status: false,
                    payload: 'Stock insuficiente'
                }
            }
            prod.stock = prod.stock - quantity

            await productModel.updateOne({_id:pid}, prod)
            return {
                status: true,
                payload: 'Stock suficiente'
            }
        } catch(e) {
            console.error(e.message)
        }
    }

}

export default productServices