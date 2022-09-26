const express = require('express')
const route = express.Router()
const ProductManager = require('../controllers/ProductManager')

const pm = new ProductManager('src/data/products.json')

route.get('/', async (req, res) => {
    try{
        res.send(await pm.getProducts())
    }
    catch (e){
        res.send(e)
    }
})

route.get('/:id', async (req, res) => {
    try{
        res.send(await pm.getProduct(parseInt(req.params.id)))
    }
    catch (e){
        res.send(e)
    }
})

route.post('/', async (req, res) => {
    try{
        res.send(await pm.createProduct(req.body))
    }
    catch (e){
        res.send(e)
    }
})

route.put('/:id', async (req, res) => {
    try{
        res.send(await pm.updateProduct(parseInt(req.params.id), req.body))
    }
    catch (e){
        res.send(e)
    }
})

route.delete('/:id', async (req, res) => {
    try{
        res.send(await pm.deleteProduct(parseInt(req.params.id)))
    }
    catch (e){
        res.send(e)
    }
})

module.exports = route