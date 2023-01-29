import BasicDao from "./basic.js"
import mongoose from 'mongoose'

export default class MongoDao extends BasicDao{
    constructor(schema, collName){
        super()
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