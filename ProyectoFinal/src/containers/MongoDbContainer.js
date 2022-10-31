import mongoose from "mongoose"
import { CONNECTION_STR } from '../config.js'

class MongoDbContainer {
    constructor(schema, collName, dbName){
        this.model = mongoose.model(collName, schema)
        mongoose.connect(CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        })
        console.log(`Conectado a Mongo Db uri: ${CONNECTION_STR}`)
    }

    async create(req, res) {
        try {
            const newItem = { timestamp: Date.now(), ...req.body }
            const result = await this.model.create(newItem)
            console.log(result)
            return res.status(200).json({ message: 'Item created!', newItem: result })
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }
    
    async readAll(req, res) {
        try {
            const items = await this.model.find()
            console.log(items)
            return res.status(200).json(items)      
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async readById(req, res) {
        try {
            const { id } = req.params
            const item = await this.model.findById(id)
            console.log(item)
            return res.status(200).json(item)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }     
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const result = await this.model.findByIdAndUpdate(id, req.body)
            console.log(result)
            return res.status(200).json({ message: 'Item updated!', itemUpdated: result})
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params
            const itemDeleted = await this.model.findByIdAndDelete(id)
            console.log(itemDeleted)
            return res.status(200).json({ message: 'Item deleted!', itemDeleted})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }   
    }
}

export default MongoDbContainer