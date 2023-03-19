import MongoDbContainer from '../../containers/MongoDbContainer.js'
import CartSchema from '../../schemas/cartSchema.js'
import mongoose from 'mongoose'
import { CONNECTION_STR } from '../../config.js'

class CartMongoDao {
    constructor(dbName){
        this.db = mongoose.createConnection(CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        })
        this.container = new MongoDbContainer(this.db.model('Carts', CartSchema))
    }

    async createCart(emptyCart){
        return this.container.create(emptyCart)
    }

    async deleteCart(id){
        return await this.container.destroy(id)
    }

    async getCartProducts(id){
        const cart = await this.container.read(id)
        return cart['products']
    }

    async addProduct2Cart(id, product){
        const cart = await this.container.read(id)
        cart['products'].push(product)
        return await cart.save()
    }

    async deleteProductFromCart(id, id_prod){
        const cart = await this.container.read(id)
        cart['products'].id(id_prod).remove()
        return await cart.save()
    }
}

export default CartMongoDao
