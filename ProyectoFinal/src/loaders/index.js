import startMongo from './mongodb.js'

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

export default new Loaders()