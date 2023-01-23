import mongoose from "mongoose"
import { MONGO_URL } from '../config/cloud.js'
import { loggerAll } from '../config/loggers.js'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const userModel = mongoose.model('user', userSchema)

class MongoContainer {
    constructor(model, dbName){
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName
        },
        () => loggerAll.info('Conectado a Mongo db'))

        this.model = model
    }

    async getOneByProp(prop){
        return await this.model.findOne(prop)
    }

    async createOne(item){
        return await this.model.create(item)
    }

    getOneById(id, cb){
        return this.model.findById(id, cb)
    }
}

export default new MongoContainer(userModel, 'passport-auth')