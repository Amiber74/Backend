import cartModel from "../models/cartModel.js";
import userModel from '../models/userModel.js'
import productModel from '../models/productsModel.js'
import { logger } from "../utils/loggers.js";
import { HandleErr, CartCreationError, ValidationError, CartNotFoundError, QuantityInvalidError} from "./errors/cartErr.js";
import {userDtoNotFoundError, InvalidCredentialsError} from './errors/userErr.js'
import {ProductAlreadyExistsError } from './errors/productErr.js'


export class cartServices {
    async newCart (){
        try {
            const newCart = {products:[]}
            const result = await cartModel.create(newCart)
            if(!result){throw new CartCreationError('Error al crear Carrito')}
            return result._id
        } catch(err) {
            HandleErr(err)
        }
    }

    async getCartByCode(code){
        try {
            if(!code){throw new ValidationError('Campo "Codigo" Incompleto')}
            const result = await cartModel.findById({_id: code}).lean()
            if(!result){throw new CartNotFoundError('Codigo de carrito inexistente')}
            return result
        } catch(e) {
            HandleErr(err)
        }
    }

    async addProduct(Cid, Pid, email, quantity=0){
        try {
            if(!Cid || !Pid || !email){throw new ValidationError('Campos Incompletos')}

            if(quantity=='') quantity=0
            if(quantity==0){throw new QuantityInvalidError('cantidad de producto 0')}
            
            const prod = await productModel.findOne({_id:Pid}).lean()
            
            if(!prod){throw new ProductAlreadyExistsError('error al encontrar producto')}
            
            const user =await userModel.findOne({email},{password:0}).lean()
            if(!user){throw new userDtoNotFoundError('error al no obtener user')}
            
            if(user.role == 'premium' && email == prod.owner){throw new InvalidCredentialsError('error de permisos premium')}
            
            const cart = await this.getCartByCode(Cid)
            if(!cart){ cart.products=[] }

            cart.products.push({product:Pid, quantity:Number(quantity)})

            const result = await cartModel.updateOne({_id:Cid}, cart).lean()

            return result
        } catch(err) {
            if(err instanceof ProductAlreadyExistsError){
                logger.error(`Error en Productos: ${err.message}`)
            } else if(err instanceof userDtoNotFoundError){
                logger.error(`Error en Productos: ${err.message}`)
            }else if(err instanceof InvalidCredentialsError){
                logger.error(`Error en Productos: ${err.message}`)
            }else{
                HandleErr(err)
            }
        }
    }
}