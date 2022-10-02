const Contenedor = require('./controller/Contenedor')
const createTables = require('./model')
const test = require('./model/test')
const {optionsSqLite, optionsMySQL} = require('./model/options')

const PROD_TABLE = 'products'
const CHAT_TABLE = 'chat'

// Test de clase contenedor + persistencia en db
// Descomentar para utilizar
// test(PROD_TABLE, CHAT_TABLE)