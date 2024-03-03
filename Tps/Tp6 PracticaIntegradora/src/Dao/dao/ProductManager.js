import fs from 'fs'
fs.promises

class ProductManager {

    constructor(path){
        this.Products = []
        this.Id = 0
        this.path = path
    }

    async getProducts (){
        try {
            
            let res = JSON.parse( await fs.readFile(this.path, 'utf-8'))
            
            return res
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async getProductById ( id ){
        const Products = await this.getProducts()

        try {
            
            if( Products.some((el) => { el.id === id} ) ) {
                return Products.find((el) => { el.id === id} )
            } else {
                return {
                    status:400,
                    message: 'Id de producto inexistente'
                }
            }
            
        } catch(e) {
        
            console.error(e.message)
        }
    }

    async addProduct (title, description, price, thumbnail, code, stock){
        if ( !title|| !description|| !price|| !code|| !stock ){
            return console.log('Valores incompletos')
        }

        const NewProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            status:true,
            id: this.Id,
            stock,
        }
        this.Id = this.Id++

        try {
            
            const Products = await this.getProducts()

            Products.push(NewProduct)
            
            await fs.writeFile(this.path, JSON.stringify(Products, null, '\t'))

            return {
                status: 200,
                Result: Products
            }
            
        } catch(e) {
        
            console.error(e.message)
        }

    }

    async updateProduct (ID, campo){

        try {
        
            const Products = await this.getProducts()

            if ( !(ListaProd.some( (el)=>{el.Id === id} )) ){
                return {
                    status:400,
                    message: 'Producto Inexistente'
                }   
            }

            const Pos = Products.findIndex( (el) => {el.id === ID} )
            
            Products[Pos] = {...Products[Pos], ...campo}

            await fs.writeFile(this.path, JSON.stringify(Products))

            this.Products = Products

        } catch(e) {
        
            console.error(e.message)
        }
    }

    async deleteProduct (ID){

        try {
            const Products = await this.getProducts()

            if ( !(ListaProd.some( (el)=>{el.Id === id} )) ){
                return {
                    status:400,
                    message: 'Producto Inexistente'
                }   
            }

            const ProductsMod = Products.filter ( (el)=> { el.id !== ID })
            
            this.Products = ProductsMod

            return {
                status:200,
                Result: this.Products
            }
            
        } catch(e) {
        
            console.error(e.message)
        }

    }


}

export default ProductManager