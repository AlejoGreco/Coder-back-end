import fs from 'fs'

class FsContainer {
    constructor(path){
        this.path = path
        console.log(`Persistencia en archivo path: ${path}`)
    }

    existFile(){
        return fs.existsSync(this.path)
    }

    async create(items) {
        await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2))    
        return items[items.length - 1]
    }
    
    async readAll() {
        if(!fs.existsSync(this.path)){
            throw { code : -3, message : `El archivo ${this.path} no existe` }
        }
        return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    }

    async readById(id) {
        const items = await this.readAll()
        const found =  items.find(item => item.id === id)
        if(found)
            return found
        
        throw { code : -4, message : `No existe el item de id ${id}` }
    }

    async update(id, body) {
        return await this.model.findByIdAndUpdate(id, body)
    }

    async destroy(id) {
        return await this.model.findByIdAndDelete(id)
    }
}

export default FsContainer