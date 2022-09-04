const express = require('express')
const route = express.Router()

let productos = []

const findById = (req, res, next) => {

    const id = parseInt(req.params.id)
    if(isNaN(id)){
        res.send({error: `El id del producto no es numerico`})
        return
    }    

    const producto = productos.find(p => p.id === id)
    if(producto){
        req.producto = producto
        next()
    }
    else
        res.send({error: `Producto de id ${id} no encontrado`})
}

route.get('/', (req, res) => {
    res.send({productos})
})

route.get('/:id', findById,(req, res) => {
        res.send({productoEncontrado : req.producto})
})

route.post('/', (req, res) => {
    const pData = req.body
    let producto = {}

    if(productos.length)
        producto = {id : (productos[productos.length - 1].id + 1), ...pData}
    else
        producto = {id : 1, ...pData}

    productos.push(producto)
    res.send({nuevoProducto : producto, message : 'Producto creado'})
})

route.put('/:id', findById, (req, res) => {
    const index = productos.findIndex(p => p.id === req.producto.id)
    productos[index].title = req.body.title
    productos[index].price = req.body.price
    productos[index].thumbnail = req.body.thumbnail
    res.send({productoEditado : productos[index], message : 'Producto modificado'})
})

route.delete('/:id', findById,(req, res) => {
    const index = productos.findIndex(p => p.id === req.producto.id)
    productos.splice(index, 1)
    res.send({productoEliminado : req.producto, message : 'Producto eliminado'})
})

module.exports = route