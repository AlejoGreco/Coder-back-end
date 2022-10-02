const express = require('express')
const { Server } = require('socket.io')
const Contenedor = require('./controller/Contenedor')
const createTables = require('./model')
const {optionsSqLite, optionsMySQL} = require('./model/options')

// Test de clase contenedor + persistencia en db
// Descomentar para utilizar
// const test = require('./model/test')
// test(PROD_TABLE, CHAT_TABLE)

const PORT = process.env.PORT || 3000
const PROD_TABLE = 'products'
const CHAT_TABLE = 'chat'


const app = express()
const server = app.listen(PORT, async () => { 
    console.log(`Server up! It's running in port ${PORT}`)
    try{
        await createTables(PROD_TABLE, CHAT_TABLE)
        console.log('Databases are ready!')
    }
    catch {
        console.log('Error in databases tables creation')
    }
})

const pManager = new Contenedor(optionsMySQL, PROD_TABLE)
const cManager = new Contenedor(optionsSqLite, CHAT_TABLE)
const io = new Server(server)   // Creamos servidor tcp para sockets

// Config del motor de plantillas EJS
app.use(express.urlencoded())
app.use(express.static('./src/public'))
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Rutas http
app.get('/', (req, res) => {
    res.render('home')
})

// Servidor websocket
io.on('connection', async socket => {
    console.log(`Nuevo cliente conectado`)
    try{
        const productos = await pManager.getAll()
        socket.emit('productos', productos)

        const messages = await cManager.getAll()
        socket.emit('messages', messages)
        
        socket.on('newProduct', async p => {
            await pManager.save(p)
            const productos = await pManager.getAll()
            io.sockets.emit('productos', productos)
        })

        socket.on('newMsg', async m => {
            await cManager.save(m)
            const messages = await cManager.getAll()
            io.sockets.emit('messages', messages)
        })
    }
    catch (e){
        console.log(e)
        pManager.db.destroy()
        cManager.db.destroy()
    }    
})