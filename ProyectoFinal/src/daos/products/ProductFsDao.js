import fs from 'fs'
import FsContainer from '../../containers/FsContainer'

class ProductFsDao extends FsContainer {
    constructor(path){
        super(path)
    }

    async getProducts(req, res){
        try {
            const products = await super.readAll()
            console.log(products)
            res.status(200).json(products)
        } 
        catch (e){
            res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async getProduct(req, res){
        try {
            const { id } = req.params
            const product = await super.readById(id)
            console.log(product)
            res.status(200).json(product)
        }
        catch (e){
            res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async createProduct(req, res){
        try {
            let newProd = { id : 1, timestamp : Date.now(), ...req.body }
            let products = []

            if(super.existFile()){
                products = await super.readAll()
                if(products.length > 0)
                {
                    newProd = { id : (products[products.length - 1].id + 1), timestamp : Date.now(), ...req.body}
                }
            }
        
            res.status(200).json(await super.create(products.push(newProd)))  
        }
        catch (e){
            res.status(404).json({code: e.code, message : e.message})
        }
    }

    async updateProduct(id, p){
        const products = await this.getProducts()
        const index = products.findIndex(p => p.id === id)

        if(index === -1){
            throw { error : -4, descripcion : `No existe el producto de id ${id}` }
        }

        products[index] = {...products[index], ...p}
        try{
            await fs.promises.writeFile(this.path, JSON.stringify([...products], null, 2))    
            return products[index]
        }
        catch {
            throw {error : -99, descripcion : 'No se pudo modificar el archivo de productos'}
        }
    }

    async deleteProduct(id){
        const products = await this.getProducts()

        const index = products.findIndex(p => p.id === id)
        if(index === -1){
            throw { error : -4, descripcion : `No existe el producto de id ${id}` }
        }

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products.filter(p => p.id !== id), null, 2))    
            return products[index]
        }
        catch {
            throw {error : -99, descripcion : 'No se pudo modificar el archivo de productos'}
        }
    }
}

export default new ProductFsDao('src/data/products.json')