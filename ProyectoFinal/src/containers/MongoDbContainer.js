import logger from '../logger/index.js'

class MongoDbContainer {
    constructor(schema, collName, db){
        this.model = db.model(collName, schema)
    }

    async create(req) {
        try {
            const newItem = { timestamp: Date.now(), ...req.body }
            const result = await this.model.create(newItem)
            logger.info(result)
            return { message: 'Item created!', newItem: result }
        }
        catch (e){
            return { error: e.message, code: e.code }
        }
    }
    
    async readAll() {
        try {
            const items = await this.model.find()
            return items    
        } 
        catch (e){
            return { error: e.message, code: e.code }
        }
    }

    async readById(req) {
        try {
            const { id } = req.params
            const item = await this.model.findById(id)
            logger.info(item)
            return { item }
        }
        catch (e){
            return { error: e.message, code: e.code }
        }     
    }

    async update(req) {
        try {
            const { id } = req.params
            const result = await this.model.findByIdAndUpdate(id, req.body)
            logger.info(result)
            return { message: 'Item updated!', itemUpdated: result}
        } 
        catch (e){
            return { error: e.message, code: e.code }
        }
    }

    async destroy(req) {
        try {
            const { id } = req.params
            const itemDeleted = await this.model.findByIdAndDelete(id)
            logger.info(itemDeleted)
            return { message: 'Item deleted!', itemDeleted}
        }
        catch (e){
            return { error: e.message, code: e.code }
        }   
    }

    async readSubitems(req, prop) {
        try {
            const { id } = req.params
            const item = await this.model.findById(id)
            return item[prop]
        }
        catch (e){
            return { error: e.message, code: e.code }
        }  
    }

    async addSubItem(req, prop) {
        try{
            const items = await this.model.findById(req.params.id)
            items[prop].push(req.body)
            const result = await items.save()
            return { message: 'Item added!', result }
        }
        catch (e){
            return { error: e.message, code: e.code }
        }
    }

    async destroySubItem(req, prop) {
        try {
            const { id, id_prod } = req.params
            const items = await this.model.findById(id)
            items[prop].id(id_prod).remove()
            const result = await items.save()
            return { message: 'Subitem destroy!', result }
        }
        catch (e){
            return { error: e.message, code: e.code }
        }    
    }
}

export default MongoDbContainer