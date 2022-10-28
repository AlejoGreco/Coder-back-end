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
        const index =  items.findIndex(item => item.id === id)
        if(index !== -1)
            return {found: items[index], index}
        
        throw { code : -4, message : `No existe el item de id ${id}` }
    }

    async update(id, body) {
        let {found, index} = await this.readById(id)
        found = {...found, ...body}

        const updatedItems = await this.readAll()
        updatedItems[index] = found

        await this.create(updatedItems)
        return found
    }

    async destroy(id) {
        const deleted = await this.readById(id).found
        const newItems = await this.readAll().filter(item => item.id !== id)
        await this.create(newItems)
        return deleted
    }
}

export default FsContainer