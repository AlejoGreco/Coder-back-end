export class Contenedor {
    constructor(fileName){
        this.fileName = fileName
        this.productos = []
        this.fs = require('fs')
    }

    save(obj){
        let newId

        if(this.productos.length)
            newId = ++this.productos[length-1].id
        else 
            newId = 1

        this.productos.push({ id : newId, ...obj })
        this.fs.writeFile(this.fileName, JSON.stringify(this.productos, null, 2), error => {
            throw new Error(error.message)
        })

        return newId
    }

}