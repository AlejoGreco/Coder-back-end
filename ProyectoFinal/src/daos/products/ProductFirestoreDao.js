import FirestoreContainer from '../../containers/FirestoreContainer.js'
import ProductSchema from '../../schemas/productSchema.js'

class ProductFirestoreDao extends FirestoreContainer {
    constructor(collectionName){
        super(ProductSchema, collectionName)   
    }

    async getProducts(req, res){
        try {
            const products = await super.readAll()
            return res.status(200).json(products)      
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async getProduct(req, res){
        try {
            const { id } = req.params
            const product = await super.readById(id)
            return res.status(200).json(product)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
    }

    async createProduct(req, res){
        try {
            const newProd = { timestamp: Date.now(), ...req.body }
            await super.create(newProd)
            return res.status(200).json({ message: 'Product created!' })
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async updateProduct(req, res){
        try {
            const { id } = req.params
            await super.update(id, req.body)
            return res.status(200).json({ message: 'Product updated!'})
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async deleteProduct(req, res){
        try {
            const { id } = req.params
            await super.destroy(id)
            return res.status(200).json({ message: 'Product deleted!'})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
    }
}

export default ProductFirestoreDao
