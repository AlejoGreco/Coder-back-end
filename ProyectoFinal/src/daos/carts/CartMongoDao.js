import MongoDbContainer from '../../containers/MongoDbContainer.js'
import CartSchema from '../../schemas/cartSchema.js'

class CartMongoDao extends MongoDbContainer {
    constructor(collectionName){
        super(CartSchema, collectionName)   
    }

    async getCarts(req, res){
        try {
            const carts = await super.readAll()
            console.log(carts)
            return res.status(200).json(carts)      
        } 
        catch (e){
            res.status(404).json({ message: e.message, code: e.code })
        }
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
              
    }

    async getCartProducts(req, res){
         
    }

    async addProductToCart(req, res){
        
    }

    async deleteProductFromCart(req, res){
        
    }

}

export default new CartMongoDao('carts')
