const express = require('express')
const Contenedor = require('../Desafio4/Contenedor')

const app = express()
const contenedor = new Contenedor('productos.txt')

// Seleccionar consigna 1 o 2 (1 : con arreglo hardcodeado - 2 : con lectura de archivo fs)
const WITH_FS = true 

let productos = [
    {title: 'Bicicleta Venzo R29', price: 80000, thumbnail: 'AAAAAAAAAAAAAA'},
    {title: 'Buzo BS', price: 5000, thumbnail: 'BBBBBBBBBBBBBBBB'},
    {title: 'Gafas ', price: 12000, thumbnail: 'CCCCCCCCCCCCCCCC'}
]

app.get('/productos', async (req, res) => {
    if(WITH_FS){
        productos =  await contenedor.getAll()
    }
    res.send({status: 'success', productos})
})

app.get('/productoRandom', async (req, res) => {
    const index = Math.floor(Math.random() * productos.length) + 1
    if(WITH_FS){
        const producto = await contenedor.getById(index)
        res.send({status : 'success', producto})
    }
    else{
        res.send({status : 'success', producto : productos[index]})
    }
})

const server = app.listen(8080, () => console.log('Server up!'))

server.on('error', error => console.log('Error en el servidor: ', error))