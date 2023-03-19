class MongoDbContainer {
    constructor(model){
        this.model = model
    }

    async create(item) {
        return await this.model.create(item)
    }
    
    async read(id) {
        if(!id)
            return await this.model.find()

        return await this.model.findById(id)
    }

    async update(id, newItem) {
        return await this.model.findByIdAndUpdate(id, newItem)
    }

    async destroy(id) {
        return await this.model.findByIdAndDelete(id)
    }
}

export default MongoDbContainer