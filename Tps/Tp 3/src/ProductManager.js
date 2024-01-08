import fs from 'fs'
fs.promises

class ProductManager{

    constructor(path){
        this.Products = []
        this.Id = 0
        this.path = path
    }

    async addProduct (title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !code || !stock){
            console.log('Valores incompletos')
        }

        const Product = {
            title,
            Id : this.Id,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.Id = this.Id++

        try{

            this.Products.push(Product)
            await fs.writeFile(this.path, JSON.stringify(this.Products) )

        } catch (e){
            console.log(e.message)
        }
    }

    getAllProducts () {
        return this.Products
    }

    async getProducts(){
        try {
            let res = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return res

        } catch(e) {
        
            console.error(e.message)
        }
    }

    async getProductById( id ){
        
        try{
            const ListaProd = JSON.parse(await fs.readFile(this.path, 'utf-8'))

            if ( (ListaProd.some( (el)=>{el.Id === id} )) ){
                return ListaProd.find( (el)=>{el.Id === id} )
            } else {
                console.error("Id Inexistente")
            }

        } catch (e){
            console.log(e.message)
        }
    }

    async updateProduct(id, campo){

        try{
            const ListaProd = JSON.parse(await fs.readFile(this.path, 'utf-8'))

            if ( !(ListaProd.some( (el)=>{el.Id === id} )) ){
                return console.log('Producto Inexistente')   
            }

            const Pos = ListaProd.findIndex( (el)=>{el.Id === id} )

            ListaProd[Pos] = {...ListaProd[Pos], ...campo}

            await fs.writeFile(this.path, JSON.stringify(ListaProd))
            this.Products = ListaProd
            
        }catch(e){
            console.log(e.message)
        }
    }

    async deleteProduct(id){

        try {
            const ListaProd = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        
            const ListaMod = ListaProd.filter( (el)=>{el.Id !== id} )
            
            await fs.writeFile( path, JSON.stringify(ListaMod) )

            this.Products = ListaMod
        }catch (e){
            console.log(e.message)
        }
    }

}

export default ProductManager