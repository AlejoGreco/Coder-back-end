const ProductMongoDao = require('./products/ProductMongoDao')

const SELECT_DAO = 'MONGO_DB'
let exports

switch (SELECT_DAO){
    case 'MONGO_DB':
        exports = {
            productDao: new ProductMongoDao(),
            cartDao: null
        }
        break;
    default:
        exports = {
            productDao: new ProductMongoDao(),
            cartDao: null
        }
        break;

}

module.exports = exports