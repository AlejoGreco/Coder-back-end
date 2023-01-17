class MongoDbContainer {
    constructor(schema, collName, db){
        this.model = db.model(collName, schema)
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

    async readSubitems(req, res, prop) {
        try {
            const { id } = req.params
            const item = await this.model.findById(id)
            console.log(item)
            return res.status(200).json(item[prop])
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }  
    }

    async addSubItem(req, res, prop) {
        try{
            const items = await this.model.findById(req.params.id)
            items[prop].push(req.body)
            const result = await items.save()
            return res.status(200).json({ message: 'Item added!', result})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async destroySubItem(req, res, prop) {
        try {
            const { id, id_prod } = req.params
            const items = await this.model.findById(id)
            items[prop].id(id_prod).remove()
            const result = await items.save()
            return res.status(200).json({ message: 'Subitem destroy!', result })
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }    
    }
}

export default MongoDbContainer