import ProductMongoDao from './products/ProductMongoDao.js'
import CartMongoDao from './carts/CartMongoDao.js'
import { PERSISTENCE } from '../config.js'

const daosExports = () => {
    let productDao
    let cartDao

    switch (PERSISTENCE){
        case 'MONGO_DB':
                productDao = ProductMongoDao,
                cartDao = CartMongoDao
            break;
        default:
                productDao = ProductMongoDao,
                cartDao = CartMongoDao
            break;
    }

    return {productDao, cartDao}
}
export const { productDao, cartDao } = daosExports()