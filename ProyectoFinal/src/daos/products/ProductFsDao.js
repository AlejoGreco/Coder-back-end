import FsContainer from '../../containers/FsContainer.js'
import ProductSchema from '../../schemas/productSchema.js'
import { FS_FILES_DEST_PATH } from '../../config.js'

class ProductFsDao extends FsContainer {
    constructor(){
        super(`${FS_FILES_DEST_PATH}products.json`, ProductSchema, 'products')
    }
    //'src/data/products.json'
}

export default ProductFsDao