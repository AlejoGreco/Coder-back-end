const express = require('express')
const route = express.Router()
const ProductManager = require('../controllers/ProductManager')

const pm = new ProductManager('src/data/products.json')
const ADMIN = true

const isAdmin = (req, res, next) => {
    if(ADMIN)
    {
        next()
    }
    else{
        res.send({error: -1, descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no autorizada`})
    }
}

const idValidate = (req, res, next) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        res.send({error: 20, descripcion: 'El id debe ser numerico'})
    }
    else if(id < 0){
        res.send({error: 21, descripcion: 'El id debe ser un numero natural'})
    }
    else{
        req.id = id
        next()
    }
}

const pDataValidate = (req, res, next) => {
    const { body } = req

    if(!body.nombre || body.nombre === '' || (typeof body.nombre !== 'string')){
        res.send({error: 22, descripcion: 'El nombre del producto es obligatorio y debe ser texto'})
        return
    }

    if(!body.descripcion || (typeof body.descripcion !== 'string')){
        req.body.descripcion = ''
        return
    }

    if(!body.url || body.url === '' || (typeof body.url !== 'string')){
        res.send({error: 22, descripcion: 'La url del producto es obligatorio y debe ser texto'})
        return
    }

    if(!body.codigo || !Number.isInteger(body.codigo)){
        res.send({error: 22, descripcion: 'El codigo de producto es obligatorio y debe ser numerico'})
        return
    }

    if(!body.stock || !Number.isInteger(body.stock) || body.stock < 0){
        res.send({error: 22, descripcion: 'El stock del producto es obligatorio y debe ser natural'})
        return
    }

    if(!body.precio || body.precio < 0 || (typeof body.precio === 'string')){
        res.send({error: 22, descripcion: 'El precio de producto es obligatorio y debe ser numerico'})
        return
    }
    next()
}

route.get('/', async (req, res) => {
    try{
        res.send(await pm.getProducts())
    }
    catch (e){
        res.send(e)
    }
})

route.get('/:id', idValidate, async (req, res) => {
    try{
        res.send(await pm.getProduct(req.id))
    }
    catch (e){
        res.send(e)
    }
})

route.post('/', isAdmin, pDataValidate, async (req, res) => {
    try{
        res.send(await pm.createProduct(req.body))
    }
    catch (e){
        res.send(e)
    }
})

route.put('/:id', isAdmin, idValidate, pDataValidate, async (req, res) => {
    try{
        res.send(await pm.updateProduct(req.id, req.body))
    }
    catch (e){
        res.send(e)
    }
})

route.delete('/:id', isAdmin, idValidate, async (req, res) => {
    try{
        res.send(await pm.deleteProduct(req.id))
    }
    catch (e){
        res.send(e)
    }
})

module.exports = route