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
}

module.exports = ProductManager