import MongoDbContainer from '../../containers/MongoDbContainer.js'
import CartSchema from '../../schemas/cartSchema.js'

class CartMongoDao extends MongoDbContainer {
    constructor(collectionName, db){
        super(CartSchema, collectionName, db)   
    }
}

export default CartMongoDao
