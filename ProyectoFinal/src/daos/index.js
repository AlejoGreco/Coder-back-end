import mongoose from 'mongoose'
import ProductMongoDao from './products/ProductMongoDao.js'
import ProductFsDao from './products/ProductFsDao.js'
import ProductFirestoreDao from './products/ProductFirestoreDao.js'
import CartMongoDao from './carts/CartMongoDao.js'
import CartFsDao from './carts/CartFsDao.js'
import CartFirestoreDao from './carts/CartFirestoreDao.js'
import { PERSISTENCE, CONNECTION_STR } from '../config.js'

const daosExports = dbName => {
    let productDao
    let cartDao

    switch (PERSISTENCE){
        case 'MONGO_DB':
                const db = mongoose.createConnection(CONNECTION_STR, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    dbName: dbName
                })
                
                productDao = new ProductMongoDao('products', db)
                cartDao = new CartMongoDao('carts', db)
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

    return { productDao, cartDao }
}
export const { productDao, cartDao } = daosExports('ecommerce')