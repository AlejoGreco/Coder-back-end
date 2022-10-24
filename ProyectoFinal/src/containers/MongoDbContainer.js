class MongoDbContainer {
    constructor(model){
        this.model = model
    }

    async create(body) {
        const  doc = await this.model.create(body)
        console.log(doc)
        return doc
    }
    
    async readAll() {
        const docs = await this.model.find()
        console.log(docs)
        return docs
    }

    async readById(id) {
        const doc = await this.model.findById(id)
        console.log(doc)
        return doc
    }

    async update(id, body) {
        const doc = await this.model.findByIdAndUpdate(id, body)
        console.log(doc)
        return doc
    }

    async destroy(id) {
        const doc = await this.model.findByIdAndDelete(id)
        console.log(doc)
        return doc
    }
}

