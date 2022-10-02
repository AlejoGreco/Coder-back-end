const createTables = require('./index')
const {optionsSqLite, optionsMySQL} = require('./options')
const Contenedor = require('../controller/Contenedor')

const testProdManager = async pMngr => {
    const productos = [
        {title: 'Prueba', price: 1234, thumbnail: 'www.holamundo.com/foto.jpeg'},
        {title: 'Coca', price: 1000, thumbnail: 'www.holamundo.com/coca.jpeg'},
        {title: 'Pasaje', price: 850, thumbnail: 'www.holamundo.com/foto22.jpeg'},
        {title: 'Impuestp', price: 2000, thumbnail: 'www.holamundo.com/foto3.jpeg'},
    ]
    await pMngr.save(productos)
    console.log((await pMngr.getAll()).result)
    console.log((await pMngr.getById(2)).result)
    console.log((await pMngr.deleteById(3)).result)
    console.log((await pMngr.getAll()).result)
    console.log((await pMngr.deleteAll()).result)
    console.log((await pMngr.getAll()).result)
    await pMngr.db.schema.dropTable(pMngr.table)
    console.log('Tabla eliminada')
    pMngr.db.destroy()
}

const testChatManager = async cMngr => {
    const messages = [
        {message: 'Hola mundo 1'},
        {message: 'Hola mundo 2'},
        {message: 'Hola mundo 3'},
        {message: 'Hola mundo 4'},
        {message: 'Hola mundo 10'}
    ]
    await cMngr.save(messages)
    console.log((await cMngr.getAll()).result)
    console.log((await cMngr.getById(2)).result)
    console.log((await cMngr.deleteById(3)).result)
    console.log((await cMngr.getAll()).result)
    console.log((await cMngr.deleteAll()).result)
    console.log((await cMngr.getAll()).result)
    await cMngr.db.schema.dropTable(cMngr.table)
    console.log('Tabla eliminada')
    cMngr.db.destroy()
}

const test = async (pTable, cTable) => {

    await createTables(pTable, cTable)

    const pManager = new Contenedor(optionsMySQL, pTable)
    const cManager = new Contenedor(optionsSqLite, cTable)

    await testProdManager(pManager)
    await testChatManager(cManager)
}

module.exports = test