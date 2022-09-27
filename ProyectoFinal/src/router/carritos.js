const express = require('express')
const route = express.Router()
const CartManager = require('../controllers/CartManager')

const cm = new CartManager('src/data/carts.json')

const cartIdValidate = (req, res, next) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        res.send({error: 20, descripcion: 'El id debe ser numerico'})
    }
    else if(id < 0){
        res.send({error: 21, descripcion: 'El id debe ser un numero natural'})
    }
    else{
        req.cartId = id
        next()
    }
}

const prodIdValidate = (req, res, next) => {
    const id = parseInt(req.params.id_prod)
    if(isNaN(id)){
        res.send({error: 20, descripcion: 'El id debe ser numerico'})
    }
    else if(id < 0){
        res.send({error: 21, descripcion: 'El id debe ser un numero natural'})
    }
    else{
        req.prodId = id
        next()
    }
}

const pDataValidate = (req, res, next) => {
    const { body } = req

    if(!body.nombre || body.nombre === ''){
        res.send({error: 22, descripcion: 'El nombre del producto es obligatorio'})
        return
    }

    if(!body.descripcion){
        req.descripcion = ''
        return
    }

    if(!body.url || body.url === ''){
        res.send({error: 22, descripcion: 'La url del producto es obligatorio'})
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

    if(!body.precio || body.precio < 0){
        res.send({error: 22, descripcion: 'El precio de producto es obligatorio y debe ser numerico'})
        return
    }
    next()
}

route.post('/', async (req, res) => {
    try{
        res.send(await cm.createCart())
    }
    catch (e){
        res.send(e)
    }
})

route.delete('/:id', cartIdValidate, async (req, res) => {
    try{
        res.send(await cm.deleteCart(req.cartId))
    }
    catch (e){
        res.send(e)
    }
})

route.get('/:id/productos', cartIdValidate, async (req, res) => {
    try{
        res.send(await cm.getCartProducts(req.cartId))
    }
    catch (e){
        res.send(e)
    }
})

route.post('/:id/productos', cartIdValidate, pDataValidate, async (req, res) => {
    try{
        res.send(await cm.addProductToCart(req.cartId, req.body))
    }
    catch (e){
        res.send(e)
    }
})

route.delete('/:id/productos/:id_prod', cartIdValidate, prodIdValidate, async (req, res) => {
    try{
        res.send(await cm.deleteProductFromCart(req.cartId, req.prodId))
    }
    catch (e){
        res.send(e)
    }
})


module.exports = route