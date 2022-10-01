const knex = require('knex')

class Contenedor {
    constructor(options, table){
        this.db = knex(options)
        this.table = table
    }

    async save(obj){
        try {
            await this.db(this.table).insert(obj)
            return {status : 'Success', message : 'Producto agregado con exito'}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }        
    }

    async getById(id){
        try {
            const producto = JSON.parse(JSON.stringify(await this.db
                .from(this.table)
                .select('*')
                .where({ id })
            ))

            if(!producto){
                return {status : 'Error', message : `El producto de id: ${id} no existe`}
            }
            return {status : 'Success', producto}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

    async getAll(){
        try {
            const productos = JSON.parse(JSON.stringify(await this.db.from(this.table).select('*')))

            if(!productos){
                return {status : 'Error', message : `No hay productos creados`}
            }
            return {status : 'Success', productos}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

    async deleteById(id){
        try {
            await this.db.from(this.table).where({id}).del() 
            return {status : 'Success', message : id}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

    async deleteAll(){
        try {
            await this.db.from(this.table).del() 
            return {status : 'Success', message : 'Se borraron todos los productos con exito'}
        }
        catch (e){
            return {status : 'Error', message : e.message}
        }
    }

}

module.exports = Contenedor