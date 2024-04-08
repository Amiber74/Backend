import ticketModel from '../models/ticketModel.js'
import userServices from './userService.js'
import cartServices from './cartService.js'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
import productServices from './productServices.js'

const PS = new productServices()
const CS = new cartServices()
const US = new userServices()

class ticketServices {

    async createTicket (cid, uid) {
        // Busco usuario y carrito
        const user = await US.getDtoUser(uid)
        const cart = await CS.getProductsCart(cid)
        const productsFail = []
        let amount = 0

        //Recorro los productos para saber si el stock es suficiente, de ser la cantidad mayor al stock disponible
        // se guarda en el array productsFail, tambien se calcula el total de los productos con la cantidad menor 
        //al stock
        for (let i= 0; i<=cart.length-1; i++) {
            let result = await PS.updateStock(cart[i].product._id, cart[i].quantity)
            if(result.status){
                amount = amount + (cart[i].product.price * cart[i].quantity)
            } else {
                //Se formatea asi para que coincida con el cartModels 
                productsFail.push({product:cart[i].product._id, quantity:cart[i].quantity})
            }
        }
        const newTicket = {
            code: uuidv4(),
            purchase_datetime: moment().format('DD-MM-YYYY HH:mm:ss'),
            amount,
            purchaser:user.email,
        }
        //Se actualiza el carrito para dejar los productos que superan el stock disponible
        await CS.updateProduct(cid, productsFail)
        //Se crea el ticket
        await ticketModel.create(newTicket)
        //Se devuelve el id de los productos que no se pudieron comprar
        return productsFail
    }

}

export default ticketServices