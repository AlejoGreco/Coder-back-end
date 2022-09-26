const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            }
            return { error : -3, descripcion : 'El archivo de productos no existe' }
        } catch (e) {
            return { error : -99, descripcion : 'Error al leer el archivo de productos' }
        }
    }

    async getProduct(id){
        try {
            const products = await this.getProducts()
            if(products.error){
                return {...products}
            }

            const product = products.find(p => p.id === id)
            if(product){
                return product
            }

            return { error : -4, descripcion : `No existe el producto de id ${id}` }

        } catch (e) {
            return { error : -100, descripcion : e.message}
        }
    }

    async createProduct(p){
        let products = []
        let newProd

        try {
            if(fs.existsSync(this.path)){
                products = await this.getProducts()
                if(products.error){
                    return {...products}
                }    
                newProd = { id : (products[products.length - 1].id + 1), timestamp : Date.now(), ...p}
            }
            else{
                newProd = { id : 1, timestamp : Date.now(), ...p }
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify([...products, newProd], null, 2))    
            return newProd
        }
        catch (e){
            return {error : -100, message : 'No se pudo crear el producto'}
        }
    }

    async updateProduct(id, p){

        try{
            const products = await this.getProducts()
            if(products.error){
                return {...products}
            }

            const index = products.findIndex(p => p.id === id)
            if(index !== -1){
                products[index] = {...products[index], ...p}
                await fs.promises.writeFile(this.path, JSON.stringify([...products], null, 2))    
                return products[index]
            }
            else{
                return { error : -4, descripcion : `No existe el producto de id ${id}` }
            }
        }
        catch (e){
            return {error : -100, message : 'No se pudo modificar el producto'}
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            if(products.error){
                return {...products}
            }

            const index = products.findIndex(p => p.id === id)
            if(index !== -1){
                await fs.promises.writeFile(this.path, JSON.stringify(products.filter(p => p.id !== id), null, 2))    
                return products[index]
            }
            else{
                return { error : -4, descripcion : `No existe el producto de id ${id}` }
            }

        } catch (e) {
            return {error : -100, descripcion : 'No se pudo borrar el producto'}
        }
    }
}

module.exports = ProductManager