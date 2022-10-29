import ProductMongoDao from './products/ProductMongoDao.js'
import ProductFsDao from './products/ProductFsDao.js'
import CartMongoDao from './carts/CartMongoDao.js'
import CartFsDao from './carts/CartFsDao.js'
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
                cartDao = CartFsDao
            break;
        default:
                productDao = ProductMongoDao,
                cartDao = CartMongoDao
            break;
    }

    return { productDao, cartDao }
}
export const { productDao, cartDao } = daosExports()