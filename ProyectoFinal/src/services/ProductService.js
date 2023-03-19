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
}

export default new ProductServices()