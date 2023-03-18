import mongoose from 'mongoose'
import ProductMongoDao from './products/ProductMongoDao.js'
import ProductFsDao from './products/ProductFsDao.js'
import ProductFirestoreDao from './products/ProductFirestoreDao.js'
import CartMongoDao from './carts/CartMongoDao.js'
import CartFsDao from './carts/CartFsDao.js'
import CartFirestoreDao from './carts/CartFirestoreDao.js'
import { PERSISTENCE, CONNECTION_STR } from '../config.js'

class DaoFactory {
    constructor(dbName, persistence){
        this.dbName = dbName
        this.persistence = persistence
        this.db
    }

    getProductDao(){
        switch (this.persistence){
            case 'MONGO_DB':
                if(!this.db){
                    this.db = mongoose.createConnection(CONNECTION_STR, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        dbName: this.dbName
                    })
                }
                return new ProductMongoDao('products', this.db)

            case 'FIRESTORE':
                return new ProductFirestoreDao('products')

            case 'FS':
                return new ProductFsDao()

            default:
                return new ProductFsDao()
        }
    }

    getCartDao(){
        switch (this.persistence){
            case 'MONGO_DB':
                if(!this.db){
                    this.db = mongoose.createConnection(CONNECTION_STR, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        dbName: this.dbName
                    })
                }
                return new CartMongoDao('carts', this.db)

            case 'FIRESTORE':
                return new CartFirestoreDao('carts')

            case 'FS':
                return new CartFsDao()

            default:
                return new CartFsDao()
        }
    }
}

export default new DaoFactory('ecommerce', PERSISTENCE)