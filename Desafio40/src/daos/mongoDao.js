import BasicDao from "./basic.js"
import mongoose from 'mongoose'
import { MONGO_URL } from '../config/cloud.js'
import { loggerAll } from '../config/loggers.js'

export default class MongoDao extends BasicDao{
    constructor(schema, dbName, collName){
        super()
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName
        },
        () => loggerAll.info('Conectado a Mongo db'))

        this.model = mongoose.model(collName, schema)
    }

    async create(item){
        return await this.model.create(item)
    }

    async findOne(attr){

        if(typeof attr === 'string'){
            // Usado por passport
            return await this.model.findById(attr)
        }
        else{
            return await this.model.findOne(attr)
        }
    }
}