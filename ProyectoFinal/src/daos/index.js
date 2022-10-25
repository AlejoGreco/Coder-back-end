import ProductMongoDao from './products/ProductMongoDao.js'

const SELECT_DAO = 'MONGO_DB'
let daos

switch (SELECT_DAO){
    case 'MONGO_DB':
        daos = {
            productDao: ProductMongoDao,
            cartDao: null
        }
        break;
    default:
        daos = {
            productDao: new ProductMongoDao(),
            cartDao: null
        }
        break;

}

export default daos