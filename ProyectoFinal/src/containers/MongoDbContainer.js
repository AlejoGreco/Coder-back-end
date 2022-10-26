import mongoose from "mongoose"
import { URI_DATABASE } from '../config.js'

class MongoDbContainer {
    constructor(schema, collName){
        this.model = mongoose.model(collName, schema)
        mongoose.connect(URI_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Conectado a Mongo Db uri: ${URI_DATABASE}`)
    }

    async create(body) {
        return await this.model.create(body)
    }
    
    async readAll() {
        return await this.model.find()
    }

    async readById(id) {
        return await this.model.findById(id)
    }

    async update(id, body) {
        return await this.model.findByIdAndUpdate(id, body)
    }

    async destroy(id) {
        return await this.model.findByIdAndDelete(id)
    }
}

export default MongoDbContainer