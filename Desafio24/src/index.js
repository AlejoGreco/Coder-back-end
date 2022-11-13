import app from "./app.js"
import fs from 'fs'
import { Server } from "socket.io"

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log('Server up!')
})

const io = new Server(server)
const msgFilePath = './messagesFile.json'
let productos = []


// sacar de aca
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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