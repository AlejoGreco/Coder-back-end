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

    async getAllProducts(){
        return await this.container.read()
    }

    async getProduct(id){
        return await this.container.read(id)
    }

    async updateProduct(id, product){
        return this.container.update(id, product)
    }

    async deleteCart(id){
        return await this.container.destroy(id)
    }
}

export default CartMongoDao
