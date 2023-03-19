import daosFactory from "../daos/index.js"

class CartServices {
    constructor(){
        this.dao = daosFactory.getCartDao()
    }

    async createCart({id}){
        const cart = {
            _id: id,
            timestamp: Date.now(),
            products: []
        }
        return this.dao.createCart(cart)
    }

    async deleteCart(id){
        return this.dao.deleteCart(id)
    }

    async readCartProducts(id){
        return await this.dao.getCartProducts(id)
    }

    async addProductCart(id, product){
        return await this.dao.addProduct2Cart(id, product)
    }

    async deleteProductCart(id, id_prod){
        return await this.dao.deleteProductFromCart(id, id_prod)
    }
}

export default new CartServices()