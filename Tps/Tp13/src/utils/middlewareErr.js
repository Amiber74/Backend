export const middlewareErr = (error, req, res) =>{
    if (error instanceof DBerror){
        res.send({status:404, msg:'Producto no encontrado'})
    }    
    if (error instanceof ProductNotFound){
        res.send({status:500, msg:'Error en la Base de Datos'})
    }
}
