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
            return {status : 'success', message : newProd.id}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
        
    }

}

module.exports = Contenedor