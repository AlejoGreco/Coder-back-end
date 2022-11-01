import FirestoreContainer from '../../containers/FirestoreContainer.js'
import CartSchema from '../../schemas/cartSchema.js'

class CartFirestoreDao extends FirestoreContainer {
    constructor(collectionName){
        super(CartSchema, collectionName)   
    }
}

export default CartFirestoreDao
