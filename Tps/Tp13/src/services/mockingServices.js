import generateProduct from '../utils/generateProduct.js'

class DBerror extends Error(){}

class mockingServices {
    getProd(){
        const result  = generateProduct()
        if(result){
            return result
        } 
        throw new DBerror()
    }
}

export default mockingServices