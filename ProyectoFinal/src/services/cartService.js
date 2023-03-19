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
}

export default new CartServices()