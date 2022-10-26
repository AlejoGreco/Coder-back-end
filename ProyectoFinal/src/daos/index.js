import ProductMongoDao from './products/ProductMongoDao.js'
import { PERSISTENCE } from '../config.js'

const daosExports = () => {
    let productDao
    let cartDao

    switch (PERSISTENCE){
        case 'MONGO_DB':
                productDao = ProductMongoDao,
                cartDao = null
            break;
        default:
                productDao = ProductMongoDao,
                cartDao = null
            break;
    }

    return {productDao, cartDao}
}
export const { productDao, cartDao } = daosExports()