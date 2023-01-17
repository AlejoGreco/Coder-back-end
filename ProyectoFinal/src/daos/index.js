import ProductMongoDao from './products/ProductMongoDao.js'
import ProductFsDao from './products/ProductFsDao.js'
import ProductFirestoreDao from './products/ProductFirestoreDao.js'
import CartMongoDao from './carts/CartMongoDao.js'
import CartFsDao from './carts/CartFsDao.js'
import CartFirestoreDao from './carts/CartFirestoreDao.js'
import { PERSISTENCE } from '../config.js'

const daosExports = () => {
    let productDao
    let cartDao
    let userDao

    switch (PERSISTENCE){
        case 'MONGO_DB':
                productDao = new ProductMongoDao('products', 'ecommerce')
                cartDao = new CartMongoDao('carts', 'ecommerce')
            break;
        case 'FIRESTORE':
                productDao = new ProductFirestoreDao('products')
                cartDao = new CartFirestoreDao('carts')
            break;
        case 'FS':
                productDao = new ProductFsDao()
                cartDao = new CartFsDao()
            break;
        default:
                productDao = new ProductFsDao()
                cartDao = new CartFsDao()
            break;
    }

    return { productDao, cartDao, userDao }
}
export const { productDao, cartDao, userDao } = daosExports()