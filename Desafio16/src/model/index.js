const knex = require('knex')
const { optionsMySQL, optionsSqLite } = require('./options')

const mysqlDB = knex(optionsMySQL)
const sqliteDB = knex(optionsSqLite)

const createTables = async (mysqlTable, sqliteTable) => {
    try{
        let message = ''
        if(!await mysqlDB.schema.hasTable(mysqlTable)){
            await mysqlDB.schema.createTable(mysqlTable, table => {
                table.increments('id')
                table.string('title')
                table.float('price')
                table.string('thumbnail')
            })
            message = `Tabla ${mysqlTable} creada - `
        }

        if(!await sqliteDB.schema.hasTable(sqliteTable)){
            await sqliteDB.schema.createTable(sqliteTable, table => {
                table.increments('id')
                table.string('email')
                table.string('msg')
                table.time('date')
            })
            message += `Tabla ${sqliteTable} creada`
        }
        return {status: 'success', result: message}
    }
    catch (e){
        throw {status : 'Error', result : {msg : e.message, code : e.code}}
    }
    finally{
        mysqlDB.destroy()
        sqliteDB.destroy()
    }
}

module.exports = createTables