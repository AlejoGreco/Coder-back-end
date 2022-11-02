import FsContainer from '../../containers/FsContainer.js'
import CartSchema from '../../schemas/cartSchema.js'
import { FS_FILES_DEST_PATH } from '../../config.js'

class CartFsDao extends FsContainer {
    constructor(){
        super(`${FS_FILES_DEST_PATH}carts.json`, CartSchema, 'carts')
    }
    // 'src/data/carts.json'

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