import mongoose from "mongoose"
import BasicDao from "./basic.js"

export default class ArrayDao extends BasicDao {
    constructor(schema, modelName){
        super()
        this.array = []
        this.model = mongoose.model(modelName, schema)
    }

    async create(item){
        const newItem = new this.model(item).toObject()
        this.array.push(newItem)
        return newItem
    }

    async findOne(attr){
        console.log(attr)
        if(typeof attr === 'string'){
            // Usado por passport
            return this.array.find(item => item._id.toString() === attr)
        }
        else{
            const queryArray = Object.entries(attr)[0] // Busco solo por la primer key | ignoro queries multiples
            return this.array.find(item => item[queryArray[0]] === queryArray[1])
        }
    }
}