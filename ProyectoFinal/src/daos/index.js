const ProductMongoDao = require('./products/ProductMongoDao')

const SELECT_DAO = 'MONGO_DB'
let daos

switch (SELECT_DAO){
    case 'MONGO_DB':
        daos = {
            productDao: new ProductMongoDao(),
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

module.exports = daos