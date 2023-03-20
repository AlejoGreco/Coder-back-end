import ProductMongoDao from './products/ProductMongoDao.js'
import ProductFsDao from './products/ProductFsDao.js'
import ProductFirestoreDao from './products/ProductFirestoreDao.js'
import CartMongoDao from './carts/CartMongoDao.js'
import CartFsDao from './carts/CartFsDao.js'
import CartFirestoreDao from './carts/CartFirestoreDao.js'
import { PERSISTENCE } from '../config.js'

class DaoFactory {
    constructor(dbName, persistence){
        this.dbName = dbName
        this.persistence = persistence
        this.productDao = null
        this.cartDao = null
    }

    getProductDao(){
        if(this.productDao)
            return this.productDao

        console.log('Creando instancia de PRODUCT DAO')
        switch (this.persistence){
            case 'MONGO_DB':
                this.productDao = new ProductMongoDao(this.dbName)
                return this.productDao

            case 'FIRESTORE':
                this.productDao = new ProductFirestoreDao('products')
                return this.productDao

            case 'FS':
                this.productDao = new ProductFsDao()
                return this.productDao

            default:
                this.productDao = new ProductFsDao()
                return this.productDao
        }
    }

    getCartDao(){
        if(this.cartDao)
            return this.cartDao

        console.log('Creando instancia de CART DAO')
        switch (this.persistence){
            case 'MONGO_DB':
                this.cartDao = new CartMongoDao(this.dbName)
                return this.cartDao

            case 'FIRESTORE':
                this.cartDao = new CartFirestoreDao('carts')
                return this.cartDao

            case 'FS':
                this.cartDao =  new CartFsDao()
                return this.cartDao

            default:
                this.cartDao = new CartFsDao()
                return this.cartDao
        }
    }
}

export default new DaoFactory('ecommerce', PERSISTENCE)