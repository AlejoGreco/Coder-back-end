import MongoDbContainer from '../../containers/MongoDbContainer.js'
import CartSchema from '../../schemas/cartSchema.js'

class CartMongoDao extends MongoDbContainer {
    constructor(collectionName){
        super(CartSchema, collectionName)   
    }

    async createCart(req, res){
        try {
            const body = { timestamp: Date.now() }
            const cart = await super.create(body)
            console.log(cart)
            return res.status(200).json(cart)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async deleteCart(req, res){
        try {
            const { id } = req.params
            const cartDeleted = await super.destroy(id)
            console.log(cartDeleted)
            return res.status(200).json({ message: 'Cart deleted!', cartDeleted})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async getCartProducts(req, res){
        try {
            const { id } = req.params
            const { products } = await super.readById(id)
            console.log(products)
            return res.status(200).json(products)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
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
            products.id(id_prod).remove()
            await super.update(id, { products })
            return res.status(200).json(products)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }    
    }

}

export default CartMongoDao
