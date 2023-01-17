import MongoDbContainer from '../../containers/MongoDbContainer.js'
import ProductSchema from '../../schemas/productSchema.js'

class ProductMongoDao extends MongoDbContainer {
    constructor(collectionName, db){
        super(ProductSchema, collectionName, db)   
    }
}

export default ProductMongoDao
