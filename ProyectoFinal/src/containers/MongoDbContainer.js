class MongoDbContainer {
    constructor(model){
        this.model = model
    }

    async create(item) {
        try {
            return await this.model.create(item)
        }
        catch (e){
            return { error: e.message, code: e.code }
        }
    }
    
    async read(id) {
        try {
            if(!id)
                return await this.model.find()

            return await this.model.findById(id)
                 
        } 
        catch (e){
            return { error: e.message, code: e.code }
        }
    }

    async update(id, newItem) {
        try {
            return await this.model.findByIdAndUpdate(id, newItem)
        } 
        catch (e){
            return { error: e.message, code: e.code }
        }
    }

    async destroy(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        }
        catch (e){
            return { error: e.message, code: e.code }
        }   
    }

    /*async readSubitems(req, prop) {
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
    }*/
}

export default MongoDbContainer