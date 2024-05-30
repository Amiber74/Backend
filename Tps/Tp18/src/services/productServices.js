import productModel from '../models/productsModel.js'
import {v4 as uuidv4} from 'uuid'
import { userServices } from './userServices.js'
import {HandleErr, ProductNotFoundError, ValidationError,InvalidProductIdError, ProductAlreadyExistsError} from './errors/productErr.js'
import { UserNotFoundError, InvalidCredentialsError } from './errors/userErr.js'

const US = new userServices()

export class productServices{

    async getAllProducts (idCart='', email){
        try {
            const result = await productModel.find().lean()
            if(!result){throw new ProductNotFoundError('Productos no Encontrados')}
            result.map((prod) => {
                prod.Cid =idCart,
                prod.email= email
            } )
            return result
        } catch(err) {
            HandleErr(err)
        }
    }

    async getOneProduct (Pid){
        const code = String(Pid)
        try {
            if(!Pid){throw new ValidationError('Campo incompleto')}
            const result = await productModel.findOne({code}).lean()
            if(!result){throw new ProductNotFoundError('Producto no Encontrado')}
            return result
        } catch(err) {
            HandleErr(err)
        }
    }
    
    async createProduct(owner='admin', title, description, price, stock){
        try {
            if(!title|| !description|| !price|| !stock){
                throw new ValidationError('Campos Incompletos')
            }
            const code = uuidv4()
            if(!code){throw new InvalidProductIdError('Codigo no generado')}
            const prod = await productModel.findOne({title})
            if(prod){throw new ProductAlreadyExistsError('Nombre del producto existente')}
            const newProduct = {owner, title, description, price, code, stock}
            const result = await productModel.create(newProduct).save()
            return result
        } catch(err) {
            HandleErr(err)
        }
    }

    async deleteProduct(pid, email){
        const code = String(pid)
        let result
        try {
            if(!pid || !email){throw new ValidationError('Campos Incompletos')}
            const prod = await productModel.findOne({code}).lean()
            if(!prod){throw new ProductNotFoundError('Producto no Encontrado')}
            const user = await US.getUserByEmail(email)
            if(!user){throw new UserNotFoundError('Usuario no encontrado')}
            if(user.role=='admin' || (user.role=='premium' && email==prod.owner)) {return result = await productModel.deleteOne({code})}
            throw new InvalidCredentialsError('No cuenta con los permisos adecuados')
        } catch(err) {
            HandleErr(err)
        }
    }

}


