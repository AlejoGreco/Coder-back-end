import daosFactory from "../daos/index.js"

class ProductServices {
    constructor(){
        this.dao = daosFactory.getProductDao()
    }

    async getProducts(){
        return await this.dao.getAllProducts()
    }

    async getProduct(id){
        return await this.dao.getProduct(id)
    }

    async createProduct(product){
        product = { timestamp: Date.now(), ...product }
        return await this.dao.createProduct(product)
    }

    async updateProduct(id, product){
        const newProduct = { timestamp: Date.now(), ...product }
        return await this.dao.updateProduct(id, newProduct)
    }

    async deleteProduct(id){
        return await this.dao.deleteProduct(id)
    }
}

export default new ProductServices()