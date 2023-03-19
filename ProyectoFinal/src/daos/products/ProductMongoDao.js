import MongoDbContainer from '../../containers/MongoDbContainer.js'
import ProductSchema from '../../schemas/productSchema.js'
import mongoose from 'mongoose'
import { CONNECTION_STR } from '../../config.js'

class ProductMongoDao {
    constructor(dbName){
        this.db = mongoose.createConnection(CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        })
        this.container = new MongoDbContainer(this.db.model('Products', ProductSchema))
    }

    async getAllProducts(){
        return await this.container.read()
    }

    async getProduct(id){
        return await this.container.read(id)
    }

    async createProduct(product){
        return this.container.create(product)
    }

    async updateProduct(id, product){
        return this.container.update(id, product)
    }

    async deleteProduct(id){
        return await this.container.destroy(id)
    }
}

export default ProductMongoDao
