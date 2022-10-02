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
            throw {status : 'Error', result : {msg : e.message, code : e.code}}
        }        
    }

    async getById(id){
        try {
            const producto = JSON.parse(JSON.stringify(await this.db
                .from(this.table)
                .select('*')
                .where({ id })
            ))

            if(producto === []){
                throw {status : 'Error', message : `El item de id: ${id} no existe`, code : 404}
            }
            return {status : 'Success', result: producto}
        }
        catch (e){
            throw {status : e.status, result : {msg : e.message, code : e.code}}
        }
    }

    async getAll(){
        try {
            const productos = JSON.parse(JSON.stringify(await this.db.from(this.table).select('*')))
            return {status : 'Success', result: productos}
        }
        catch (e){
            throw {status : 'Error', result : {msg : e.message, code : e.code}}
        }
    }

    async deleteById(id){
        try {
            await this.db.from(this.table).where({id}).del() 
            return {status : 'Success', result : id}
        }
        catch (e){
            throw {status : 'Error', result : {msg : e.message, code : e.code}}
        }
    }

    async deleteAll(){
        try {
            await this.db.from(this.table).del() 
            return {status : 'Success', result : 'Se borraron todos los items con exito'}
        }
        catch (e){
            throw {status : 'Error', result : {msg : e.message, code : e.code}}
        }
    }

}

module.exports = Contenedor