const express = require('express')
const route = express.Router()

const productos = []

route.get('/', (req, res) => {
    res.render('productos', {
        productos
    })
})

route.post('/', (req, res) => {
    if(req.body){
        productos.push(req.body)
        res.redirect('/')
    }
    else{
        res.status(400).send({error: 'Datos erroneos'})
    }

})

module.exports = route