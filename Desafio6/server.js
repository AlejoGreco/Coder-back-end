const express = require('express')

const app = express()

const productos = [
    {title: 'Bicicleta Venzo R29', price: 80000, thumbnail: 'AAAAAAAAAAAAAA'},
    {title: 'Buzo BS', price: 5000, thumbnail: 'BBBBBBBBBBBBBBBB'},
    {title: 'Gafas ', price: 12000, thumbnail: 'CCCCCCCCCCCCCCCC'}
]

app.get('/productos', (req, res) => {
    res.send({status: 'success', productos})
})

app.get('/productoRandom', () => {
    
})

const server = app.listen(8080, () => console.log('Server up!'))

server.on('error', error => console.log('Error en el servidor: ', error))