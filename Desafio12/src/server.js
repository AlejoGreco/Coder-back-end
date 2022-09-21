const express = require('express')
const { Server } = require('socket.io')
const fs = require('fs')

const PORT = process.env.PORT || 3000

const app = express()
const server = app.listen(PORT, () => console.log(`Server up! It's running in port ${PORT}`))

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

const readChatMsg = async path => {
    try{
        if(fs.existsSync(path)){
            const messages= JSON.parse(await fs.promises.readFile(path))
            return messages            
        }
        else { return [] }
    }
    catch (e){
        throw {error : e.code, msg : 'Error leyendo archivo de hisorial de chat'}
    }
}

const writeChatMsg = async (path, messages) => {
    try{
        await fs.promises.writeFile(path, JSON.stringify(messages, null, 2))
    }
    catch (e){
        throw {error : e.code, msg : 'Error escribiendo archivo de hisorial de chat'}
    }

}


// Servidor websocket
let productos = []
const msgFilePath = './messagesFile.json'

io.on('connection', async socket => {
    console.log(`Nuevo cliente conectado`)
    socket.emit('productos', productos)

    const messages = await readChatMsg(msgFilePath)
    socket.emit('messages', messages)
    
    socket.on('newProduct', p => {
        productos.push(p)
        io.sockets.emit('productos',productos)
    })

    socket.on('newMsg', async m => {
        const messages = await readChatMsg(msgFilePath)
        console.log(messages)
        messages.push(m)
        io.sockets.emit('messages', messages)
        writeChatMsg(msgFilePath, messages)
    })
})