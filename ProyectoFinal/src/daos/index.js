import ProductMongoDao from './products/ProductMongoDao.js'
import ProductFsDao from './products/ProductFsDao.js'
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
        case 'FS':
                productDao = ProductFsDao,
                cartDao = null
            break;
        default:
                productDao = ProductMongoDao,
                cartDao = CartMongoDao
            break;
    }

    return { productDao, cartDao }
}
export const { productDao, cartDao } = daosExports()