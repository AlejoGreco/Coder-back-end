const startMongo = require('./mongodb')

class Loaders {
    start(target) {
        switch (target){
            case 'MONGO_DB':
                startMongo()
            break;
        default:
            break;
        }
        
    }
}

module.exports = new Loaders()