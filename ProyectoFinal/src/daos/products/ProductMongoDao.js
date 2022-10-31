import MongoDbContainer from '../../containers/MongoDbContainer.js'
import ProductSchema from '../../schemas/productSchema.js'

class ProductMongoDao extends MongoDbContainer {
    constructor(collectionName, dbName){
        super(ProductSchema, collectionName, dbName)   
    }
}

export default ProductMongoDao
