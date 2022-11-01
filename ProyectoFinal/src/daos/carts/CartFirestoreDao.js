import FirestoreContainer from '../../containers/FirestoreContainer.js'
import CartSchema from '../../schemas/cartSchema.js'

class CartFirestoreDao extends FirestoreContainer {
    constructor(collectionName){
        super(CartSchema, collectionName)   
    }

    async addProductToCart(req, res){
        try {
            const { id } = req.params
            const { products } = await super.readById(id)
            products.push(req.body)
            await super.update(id, { products })
            return res.status(200).json(products)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
    }

    async deleteProductFromCart(req, res){
        try {
            const { id, id_prod } = req.params
            const { products } = await super.readById(id)
            const newProducts = products.filter((p, ind) => ind !== parseInt(id_prod))
            await super.update(id, { products: newProducts })
            return res.status(200).json(newProducts)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }    
    }

}

export default CartFirestoreDao
