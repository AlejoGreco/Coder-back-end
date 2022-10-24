class MongoDbContainer {
    constructor(model){
        this.model = model
    }

    async create(req) {
        const  doc = await this.model.create(req.body)
        console.log(doc)
        return doc.json()
    }
    
    async readAll() {
        const docs = await this.model.find()
        console.log(docs)
        return docs.toArray()
    }

    async readById(id) {
        const doc = await this.model.findById(id)
        console.log(doc)
        return doc.json()
    }

    async update(id) {
            const doc = await this.model.findByIdAndUpdate(id, req.body)
            console.log(doc)
            return doc.json()
    }

    async destroy(id) {
        const doc = await this.model.findByIdAndDelete(id)
        console.log(doc)
        return doc.json()
    }
}

