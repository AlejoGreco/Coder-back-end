const MongoDbContainer = require('../../containers/MongoDbContainer')
const ProductModel = require('../../models/productModel')

class ProductMongoDao extends MongoDbContainer {
    constructor(){
        super(ProductModel)
    }

    async getProducts(req, res){
        try {
            const products = await this.readAll()
            console.log(products)
            return res.status(200).json(products.toArray())        
        } 
        catch (e){
            res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async getProduct(req, res){
        try {
            const { id } = req.params
            const product = await this.readById(id)
            console.log(product)
            return res.status(200).json(product)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
    }

    async createProduct(req, res){
        try {
            const newProd = { timestamp: Date.now(), ...req.body }
            const result = await this.create(newProd)
            console.log(result)
            return res.status(200).json(result)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async updateProduct(req, res){
        try {
            const { id } = req.params
            const result = await this.update(id, req.body)
            console.log(result)
            return res.status(200).json({ message: 'Product updated!', productUpdated: result})
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async deleteProduct(req, res){
        try {
            const { id } = req.params
            const productDeleted = await this.destroy(id)
            console.log(productDeleted)
            return res.status(200).json({ message: 'Product deleted!', productDeleted})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
    }
}

module.exports = ProductMongoDao
