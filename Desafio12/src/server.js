const express = require('express')
const { Server } = require('socket.io')

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


// Servidor websocket
let productos = []
let messages = []

io.on('connection', socket => {
    console.log(`Nuevo cliente conectado`)
    socket.emit('productos', productos)
    socket.emit('messages', messages)
    
    socket.on('newProduct', p => {
        productos.push(p)
        io.sockets.emit('productos',productos)
    })

    socket.on('newMsg', m => {
        messages.push(m)
        io.sockets.emit('messages', messages)
    })
})