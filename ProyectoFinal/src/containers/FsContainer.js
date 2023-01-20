import fs from 'fs'
import mongoose from 'mongoose'
import logger from '../logger/index.js'

class FsContainer {
    constructor(path, schema, collName){
        this.path = path
        this.model = mongoose.model(collName, schema)
        logger.info(`Persistencia en archivo path: ${path}`)
    }

    async create(req, res) {
        try {
            const newItem = new this.model({ timestamp : Date.now(), ...req.body }).toObject()
            let items = []

            if(fs.existsSync(this.path)){
                items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            }
            
            items.push(newItem)
            await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2))    
            return res.status(200).json({message: 'Item created', newItem: items[items.length - 1]})  
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
        }
    }
    
    async readAll(req, res) {
        try {
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            return res.status(200).json(items)
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async readById(req, res) {
        try {
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            
            const index =  items.findIndex(item => item._id === req.params.id)
            if(index !== -1)
                return res.status(200).json({found: items[index], index})
                
            throw { code : -4, message : `No existe el item de id ${re.params.id}` }
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async update(req, res) {
        try {
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            
            const index =  items.findIndex(item => item._id === req.params.id)
            if(index === -1)
                throw { code : -4, message : `No existe el item de id ${req.params.id}` }

            const {_id, ...newItem} = new this.model({...items[index], ...req.body}).toObject()
            items[index] = {_id: items[index]._id, ...newItem}

            await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2))    
            return res.status(200).json({message: 'Item updated!', updated: items[index]})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async destroy(req, res) {
        try{
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            
            const index =  items.findIndex(item => item._id === req.params.id)
            if(index === -1)
                throw { code : -4, message : `No existe el item de id ${req.params.id}` }

            const newItems = items.filter(item => item._id !== req.params.id)
            
            await fs.promises.writeFile(this.path, JSON.stringify(newItems, null, 2))    
            return res.status(200).json({ message: 'Item deleted!', itemDeleted: items[index]})
        }
        catch (e){
            return res.status(404).json({code: e.code, message : e.message})
        }
    }

    async readSubitems(req, res, prop) {
        try {
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            
            const index =  items.findIndex(item => item._id === req.params.id)
            if(index === -1)
                throw { code : -4, message : `No existe el item de id ${re.params.id}` }
                
            return res.status(200).json(items[index][prop])
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async addSubItem(req, res, prop) {
        try{
            //nuevo obj
            const newItem = { timestamp: Date.now(), ...req.body }
            const children = new this.model({timestamp: Date.now()})[prop]
            children.push(newItem)
            const child  = children[0].toObject()

            //lectura
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            
            const index =  items.findIndex(item => item._id === req.params.id)
            if(index === -1)
                throw { code : -4, message : `No existe el item de id ${re.params.id}` }
                
            items[index][prop].push(child)

            await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2))    
            return res.status(200).json({ message: 'Item added!', child})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async destroySubItem(req, res, prop) {
        try {
            if(!fs.existsSync(this.path)){
                throw { code : -3, message : `El archivo ${this.path} no existe` }
            }
            const items = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            
            const index =  items.findIndex(item => item._id === req.params.id)
            if(index === -1)
                throw { code : -4, message : `No existe el item de id ${re.params.id}` }
              
            items[index][prop] = items[index][prop].filter(item => item._id !== req.params.id_prod)

            await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2))    
            return res.status(200).json({ message: 'SubItem destoy!'})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }    
    }
}

export default FsContainer