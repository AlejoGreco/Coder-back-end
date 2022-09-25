const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(){
        try {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } catch (e) {
            return { error : -3, descripcion : 'El archivo de productos no existe' }
        }
    }

    async getProduct(id){
        try {
            const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            const product = products.find(p => p.id === id)
            if(product){
                return product
            }
            throw new Error(`No existe el producto de id ${id}`)

        } catch (e) {
            if(e.message.startsWith('No existe el producto de id')){
                return { error : -4, descripcion : e.message}
            }
            return { error : -3, descripcion : 'El archivo de productos existe' }
        }
    }

    async createProduct(p){
        let products = []
        let newProd

        try {
            if(fs.existsSync(this.path)){
                products = await this.getProducts()
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
}

module.exports = ProductManager