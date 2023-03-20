import daosFactory from "../daos/index.js"
// SACAR DE ACA
import { emailViewGenerator, emailCartListGen, smsContentGenerator } from '../utils/transportPayloads.js'
import transporter from '../transports/mailer.js'
import twilioClient, { twilioNumber } from '../transports/sms.js'
import { ADMIN_EMAIL } from '../transports/mailer.js'

class CartServices {
    constructor(){
        this.dao = daosFactory.getCartDao()
        this.auxDao = daosFactory.getProductDao()
    }

    async createCart({id}){
        const cart = {
            _id: id,
            timestamp: Date.now(),
            products: []
        }
        return this.dao.createCart(cart)
    }

    async deleteCart(id){
        return this.dao.deleteCart(id)
    }

    async readCartProducts(id){
        return await this.dao.getCartProducts(id)
    }

    async addProductCart(id, product){
        return await this.dao.addProduct2Cart(id, product)
    }

    async deleteProductCart(id, id_prod){
        return await this.dao.deleteProductFromCart(id, id_prod)
    }

    async collectCart(user){
        const result = await this.dao.getCartProducts(user.id)
        //logger.info(result)
        
        if(result.length === 0){
            return res.status(400).send({error: 'No puede generar orden', code: -10})
        }

        const mailContent = {
            subject: `Nuevo Pedido de ${user.name} | ${user.email}`,
            title: `Orden de compra #${user.id}`,
            footer: `Lo estara recibiendo en los proximos dias`,
            body: `<ul>${emailCartListGen(result)}</ul>`
        }

        const mailOptions = emailViewGenerator(ADMIN_EMAIL, ADMIN_EMAIL, mailContent)
        const clientMsg = smsContentGenerator(twilioNumber, user.phone)

        await transporter.sendMail(mailOptions)
        await twilioClient.messages.create(clientMsg)
        
        const {_id, __v, password, ...userInfo} = user._doc
        return ({message: 'Orden generada con exito!', cart: result, user: userInfo})
    }
}

export default new CartServices()