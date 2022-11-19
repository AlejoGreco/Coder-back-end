import app from "./app.js"
import { Server } from "socket.io"
import { PORT } from "./config/cloud.js"
import { readChatMsg, writeChatMsg } from "./utils/sockets.js"

const server = app.listen(PORT, () => {
    console.log('Server up!')
})


let productos = []
const msgFilePath = './messagesFile.json'
const io = new Server(server)

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