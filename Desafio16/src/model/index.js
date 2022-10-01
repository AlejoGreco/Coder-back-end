const knex = require('knex')
const { optionsMySQL, optionsSqLite } = require('./options')

const mysqlDB = knex(optionsMySQL)
const sqliteDB = knex(optionsSqLite)

const createTables = (mysqlTable, sqliteTable) => {
    if(!mysqlDB.schema.hasTable(mysqlTable)){
        mysqlDB.schema.createTable(mysqlTable, table => {
            table.increments('id')
            table.string('title')
            table.float('price')
            table.string('thumbnail')
        })
        .then(() => ({status: 'success', message: `Tabla ${mysqlTable} creada con exito`}))
        .catch(e => ({status: 'Error', message: e.message}))
        .finally(() => mysqlDB.destroy())
    }

    if(!sqliteDB.schema.hasTable(sqliteTable)){
        sqliteDB.schema.createTable(sqliteTable, table => {
            table.increments('id')
            table.string('message')
        })
        .then(() => ({status: 'success', message: `Tabla ${sqliteTable} creada con exito`}))
        .catch(e => ({status: 'Error', message: e.message}))
        .finally(() => sqliteDB.destroy())
    }
}

module.exports = createTables