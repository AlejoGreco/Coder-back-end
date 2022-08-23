const fs = require('fs')

class Contenedor {
    constructor(fileName){
        this.fileName = fileName
    }

    async save(obj){
        let newProd
        let products = []
    
        try {
            if(fs.existsSync(this.fileName)){
                products = JSON.parse(await fs.promises.readFile(this.fileName))
                newProd = { id : (products[products.length - 1].id + 1), ...obj}
            }
            else{
                newProd = { id : 1, ...obj }
            }
    
            await fs.promises.writeFile(this.fileName, JSON.stringify([...products, newProd], null, 2))    
            return {status : 'Success', message : newProd.id}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
        
    }

    async getById(id){
        try {
            if(fs.existsSync(this.fileName)){
                const products = JSON.parse(await fs.promises.readFile(this.fileName))
                return products.find(p => p.id === id)
            }
            return {status : 'Error', message : 'El archivo no existe'}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

    async getAll(){
        try {
            if(fs.existsSync(this.fileName)){
                return JSON.parse(await fs.promises.readFile(this.fileName))
            }
            return {status : 'Error', message : 'El archivo no existe'}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

    async deleteById(id){
        try {
            if(fs.existsSync(this.fileName)){
                const products = JSON.parse(await fs.promises.readFile(this.fileName))
                
                if(!products.find(p => p.id === id))
                    return {status : 'Error', message : 'El producto no existe'}

                const newProducts = products.filter(p => p.id !== id)

                await fs.promises.writeFile(this.fileName, JSON.stringify(newProducts, null, 2))    
                return {status : 'Success', message : id}
                
            }
            return {status : 'Error', message : 'El archivo no existe'}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

    async deleteAll(){
        try {
            if(fs.existsSync(this.fileName)){
                await fs.promises.unlink(this.fileName)
            }
            return {status : 'Error', message : 'El archivo no existe'}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

}

module.exports = Contenedor