import MongoDbContainer from '../../containers/MongoDbContainer.js'
import CartSchema from '../../schemas/cartSchema.js'

class CartMongoDao extends MongoDbContainer {
    constructor(collectionName, dbName){
        super(CartSchema, collectionName, dbName)   
    }
}

export default CartMongoDao
