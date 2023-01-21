import { Router }  from 'express'
import { cartDao } from '../daos/index.js'
import transporter from '../transports/mailer.js'
import twilioClient, { twilioNumber } from '../transports/sms.js'
import { ADMIN_EMAIL } from '../transports/mailer.js'
import logger from '../logger/index.js'
import { emailViewGenerator, emailCartListGen, smsContentGenerator } from '../utils/transportPayloads.js'

const route = Router()

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

    if(!body.nombre || body.nombre === '' || (typeof body.nombre !== 'string')){
        res.send({error: 22, descripcion: 'El nombre del producto es obligatorio y debe ser texto'})
        return
    }

    if(!body.descripcion || (typeof body.descripcion !== 'string')){
        req.body.descripcion = ''
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

route.post('/:id/collect', async (req, res) => {
    const result = await cartDao.readSubitems(req, 'products')
    logger.info(result)
    if(result.length === 0){
        return res.status(400).send({error: 'No puede generar orden', code: -10})
    }

    const mailContent = {
        subject: `Nuevo Pedido de ${req.user.name} | ${req.user.email}`,
        title: `Orden de compra #${req.user.id}`,
        footer: `Lo estara recibiendo en los proximos dias`,
        body: `<ul>${emailCartListGen(result)}</ul>`
    }

    const mailOptions = emailViewGenerator(ADMIN_EMAIL, ADMIN_EMAIL, mailContent)
    const clientMsg = smsContentGenerator(twilioNumber, req.user.phone)

    await transporter.sendMail(mailOptions)
    await twilioClient.messages.create(clientMsg)
    
    const {_id, __v, password, ...user} = req.user._doc
    res.send({message: 'Orden generada con exito!', cart: result, user})
})

route.post('/', async (req, res) => {
    const result = await cartDao.create(req)
    res.send(result)
})

route.delete('/:id', async (req, res) => {
    const result = await cartDao.destroy(req)
    res.send(result)
})

route.get('/:id/productos', async (req, res) => {
    let result = await cartDao.readSubitems(req, 'products')
    if(result.error){
        logger.info('El usuario no tiene carrito')
        req.body._id = req.params.id
        result = await cartDao.create(req)
    }
    res.send(result)
})

route.post('/:id/productos', pDataValidate, async (req, res) => {
    const result = await cartDao.addSubItem(req, 'products')
    res.send(result)
})

route.delete('/:id/productos/:id_prod', async (req, res) => {
    const result = await cartDao.destroySubItem(req, res, 'products')
    res.send(result)
})

export default route


/*route.post('/', async (req, res) => {
    try{
        res.send(await cm.createCart())
    }
    catch (e){
        res.send(e)
    }
})*/

/*route.delete('/:id', cartIdValidate, async (req, res) => {
    try{
        res.send(await cm.deleteCart(req.cartId))
    }
    catch (e){
        res.send(e)
    }
})*/

/*route.get('/:id/productos', cartIdValidate, async (req, res) => {
    try{
        res.send(await cm.getCartProducts(req.cartId))
    }
    catch (e){
        res.send(e)
    }
})*/

/*route.post('/:id/productos', cartIdValidate, pDataValidate, async (req, res) => {
    try{
        res.send(await cm.addProductToCart(req.cartId, req.body))
    }
    catch (e){
        res.send(e)
    }
})*/

/*route.delete('/:id/productos/:id_prod', cartIdValidate, prodIdValidate, async (req, res) => {
    try{
        res.send(await cm.deleteProductFromCart(req.cartId, req.prodId))
    }
    catch (e){
        res.send(e)
    }
})*/