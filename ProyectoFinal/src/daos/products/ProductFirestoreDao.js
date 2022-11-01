import FirestoreContainer from '../../containers/FirestoreContainer.js'
import ProductSchema from '../../schemas/productSchema.js'

class ProductFirestoreDao extends FirestoreContainer {
    constructor(collectionName){
        super(ProductSchema, collectionName)   
    }
}

export default ProductFirestoreDao
