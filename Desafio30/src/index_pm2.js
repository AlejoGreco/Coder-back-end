import app from "./app.js"
import yargs from "yargs"
import { Server } from "socket.io"
import { readChatMsg, writeChatMsg } from "./utils/sockets.js"

const { PORT } = yargs(process.argv.slice(2)).default({PORT: 8080}).argv

const server = app.listen(PORT, () => {
    console.log(`Process Id: ${process.pid} - Server up!`)
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