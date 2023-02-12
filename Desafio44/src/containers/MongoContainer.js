export default class MongoContainer {
    constructor(model){
        this.model = model
    }

    async findOne(id){
        return await this.model.findById(id)
    }

    async findAll(query){
        if(query!== null && query !== {}){
            return await this.model.find(query)
        }
        else
            return await this.model.find()
    }

    async create(object){
        return await this.model.create(object)
    }

    async update(id, query){
        return await this.model.findByIdAndUpdate(id, query)
    }

    async delete(id){
        return await this.model.findByIdAndDelete(id)
    }
}
