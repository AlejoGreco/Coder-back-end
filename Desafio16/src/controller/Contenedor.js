const knex = require('knex')

class Contenedor {
    constructor(options, table){
        this.db = knex(options)
        this.table = table
    }

    async save(obj){
        try {
            await this.db(this.table).insert(obj)
            return {status : 'Success', result : 'Item agregado con exito'}
        }
        catch (e){
            return {status : 'Error', result : e.message}
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
                return {status : 'Error', result : `El item de id: ${id} no existe`}
            }
            return {status : 'Success', result: producto}
        }
        catch (e){
            return {status : 'Error', result : e.message}
        }
    }

    async getAll(){
        try {
            const productos = JSON.parse(JSON.stringify(await this.db.from(this.table).select('*')))

            if(!productos){
                return {status : 'Error', result : `No hay items creados`}
            }
            return {status : 'Success', result: productos}
        }
        catch (e){
            return {status : 'Error', result : e.message}
        }
    }

    async deleteById(id){
        try {
            await this.db.from(this.table).where({id}).del() 
            return {status : 'Success', result : id}
        }
        catch (e){
            return {status : 'Error', result : e.message}
        }
    }

    async deleteAll(){
        try {
            await this.db.from(this.table).del() 
            return {status : 'Success', result : 'Se borraron todos los items con exito'}
        }
        catch (e){
            return {status : 'Error', result : e.message}
        }
    }

}

module.exports = Contenedor