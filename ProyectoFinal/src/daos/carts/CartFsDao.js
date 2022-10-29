import FsContainer from '../../containers/FsContainer.js'
import { FS_FILES_DEST_PATH } from '../../config.js'

class CartFsDao extends FsContainer {
    constructor(){
        super(`${FS_FILES_DEST_PATH}carts.json`)
    }
    // 'src/data/carts.json'

    async createCart(req, res){
        try {
            let newCart = { id : 1, timestamp : Date.now() }
            let carts = []

            if(super.existFile()){
                carts = await super.readAll()
                if(carts.length > 0)
                {
                    newCart = { id : (carts[carts.length - 1].id + 1), timestamp : Date.now()}
                }
            }
        
            return res.status(200).json(await super.create(carts.push(newCart)))  
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
        }
    }

    async deleteCart(req, res){
        try{
            const { id } = req.params
            const deleted = await super.destroy(id)
            return res.status(200).json({ message: 'Cart deleted!', cartDeleted: deleted})
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
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

            const newProd = {...req.body}
            const cartProdLength = products.length
            
            if(cartProdLength > 0){
                newProd.id = products[cartProdLength - 1].id + 1
            }
            else {
                newProd.id = 1
            }
            newProd.timestamp = Date.now()
    
            products.push(newProd)
            await super.update(id, {products})
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

            const prod = products.find(p => p.id === id_prod)

            if(!prod){
                throw { code : -4, message : `No existe el producto de id ${id_prod}` }
            }

            const newProducts = products.filter(p => p.id !== id_prod)

            await super.update(id, {newProducts})
            return res.status(200).json(newProducts)
        }
        catch (e){
            res.status(404).json({ code: e.code, message: e.message })
        }
    }

}

export default CartFsDao