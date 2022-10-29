import FsContainer from '../../containers/FsContainer.js'
import { FS_FILES_DEST_PATH } from '../../config.js'

class ProductFsDao extends FsContainer {
    constructor(){
        super(`${FS_FILES_DEST_PATH}products.json`)
    }
    //'src/data/products.json'

    async getProducts(req, res){
        try {
            const products = await super.readAll()
            console.log(products)
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
            console.log(product)
            return res.status(200).json(product.found)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async createProduct(req, res){
        try {
            let newProd = { id : 1, timestamp : Date.now(), ...req.body }
            let products = []

            if(super.existFile()){
                products = await super.readAll()
                if(products.length > 0)
                {
                    newProd = { id : (products[products.length - 1].id + 1), timestamp : Date.now(), ...req.body}
                }
            }
        
            return res.status(200).json(await super.create(products.push(newProd)))  
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
        }
    }

    async updateProduct(req, res){
        try {
            const { id } = req.params
            const updated = await super.update(id, req.body)
            return res.status(200).json({ message: 'Product updated!', productUpdated: updated})
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
        }
    }

    async deleteProduct(req, res){
        try{
            const { id } = req.params
            const deleted = await super.destroy(id)
            return res.status(200).json({ message: 'Product deleted!', productDeleted: deleted})
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
        }
    }
}

export default ProductFsDao