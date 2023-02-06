import app from "./app.js"
import yargs from "yargs"
import cluster from "cluster"
import { Server } from "socket.io"
import { cpus } from "os"
import { loggerAll, loggerWarn, loggerError } from "./config/loggers.js"
import { readChatMsg, writeChatMsg } from "./utils/sockets.js"

const { PORT } = yargs(process.argv.slice(2)).default({PORT: 8080}).argv
const { mode } = yargs(process.argv.slice(2)).default({mode: 'FORK'}).argv

if(cluster.isPrimary){
    loggerAll.info(`Father | Process Id: ${process.pid}`)
    if(mode === 'CLUSTER'){
        for(let i = 0; i < cpus().length; i++){
            cluster.fork()
        }
    }
    else {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        cluster.fork()
        loggerWarn.warn(`Worker Pid: ${worker.process.pid}  finalizo.`)
        loggerAll.info(`Nuevo worker creado`)
    })
}
else {
    const server = app.listen(PORT, () => {
        loggerAll.info(`Process Id: ${process.pid} - Server up!`)
    })
    
    let productos = []
    const msgFilePath = './messagesFile.json'
    const io = new Server(server)
    
    io.on('connection', async socket => {
        loggerAll.info(`Nuevo cliente conectado`)
        try{
            socket.emit('productos', productos)
    
            const messages = await readChatMsg(msgFilePath)
            socket.emit('messages', messages)
        }
        catch (e){
            loggerError.error(e)
        }

        socket.on('newProduct', p => {
            try{
                // Descomentar para generar logs de error
                //throw { message : 'Error falso para probar logs' }
                productos.push(p)
                io.sockets.emit('productos',productos)
            }
            catch (e){
                loggerError.error({error: 'NEW_PROD', msg: e.message})
            }
        })
    
        socket.on('newMsg', async m => {
            try{
                // Descomentar para generar logs de error
                //throw { message : 'Error falso para probar logs' }
                const messages = await readChatMsg(msgFilePath)
                messages.push(m)
                io.sockets.emit('messages', messages)
                writeChatMsg(msgFilePath, messages)
            }
            catch (e){
                loggerError.error({error: 'NEW_MSG', msg: e.message})
            }
        })
    })
}