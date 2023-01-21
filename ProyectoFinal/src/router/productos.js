import { Router } from 'express'
import { productDao } from '../daos/index.js'
import { checkAuthAdmin } from '../middlewares/auth.js'

const route = Router()

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
    const result = await productDao.readAll(req)
    res.send(result)
})
route.get('/:id', async (req, res) => {
    const result = await productDao.readById(req)
    res.send(result)
})
route.post('/', checkAuthAdmin, pDataValidate, async (req, res) => {
    const result = await productDao.create(req)
    res.send(result)
})
route.put('/:id', checkAuthAdmin, pDataValidate, async (req, res) => {
    const result = await productDao.update(req)
    res.send(result)
})
route.delete('/:id', checkAuthAdmin, async (req, res) => {
    const result = await productDao.destroy(req)
    res.send(result)
})

export default route