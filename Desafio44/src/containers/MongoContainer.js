export default class MongoContainer {
    constructor(model){
        this.model = model
    }

    async findOne(id){
        return await this.model.findById(id)
    }

    async findAll({key, value}){
        if(key && value)
            return await this.model.find({[key]: value})
        else
            return await this.model.find({})
    }

    async create(object){
        return await this.model.create(object)
    }

    async update(id, {key, value}){
        return await this.model.findByIdAndUpdate(id, {[key]: value})
    }

    async delete(id){
        return await this.model.findBiIdAndDelete(id)
    }
}
