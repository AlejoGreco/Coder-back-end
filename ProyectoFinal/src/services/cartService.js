import daosFactory from "../daos/index.js"
// SACAR DE ACA
import { emailViewGenerator, emailCartListGen, smsContentGenerator } from '../utils/transportPayloads.js'
import transporter from '../transports/mailer.js'
import twilioClient, { twilioNumber } from '../transports/sms.js'
import { ADMIN_EMAIL } from '../transports/mailer.js'
import ErrorDto from "../dtos/ErrorDto.js"
import validationDtos from "../validations/validationDtos.js"

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

    async addProductCart(id, prodAddReq){
        try{
            await validationDtos.validateCartProductDto(prodAddReq)
            const { id_prod, amount } = prodAddReq
            const product = await this.auxDao.getProduct(id_prod)
            
            if(!product)
                throw new ErrorDto({params: {id_prod}}, 'No se pudo obtener el producto - ADD to CART', 404, 40)
            
            if(product.stock <  amount)
                throw new ErrorDto({params: {id_prod, stock: product.stock, amount}}, 'No hay stock del producto - ADD to CART', 401, 41)

            product.stock -= amount
            await this.auxDao.updateProduct(id_prod, product)

            return await this.dao.addProduct2Cart(id, product)
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({ 
                    params: { [e.path]: e.params.value ?  e.params.value : 'undefined'}
                }, 
                e.message, 400, -420)
            }
            throw e
        }
    }

    async deleteProductCart(id, id_prod){
        return await this.dao.deleteProductFromCart(id, id_prod)
    }

    async collectCart(user){
        const result = await this.dao.getCartProducts(user.id)
        //logger.info(result)
        
        if(result.length === 0){
            throw new ErrorDto({params: {cartLength: 0}}, 'No puede generar orden. No hay productos en el carrito', 400, -42)
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
        
        // collect DTO (cart dejo solo el array de productos y fecha del colect, user dejo igual que abajo)
        const {_id, __v, password, ...userInfo} = user._doc
        return ({message: 'Orden generada con exito!', cart: result, user: userInfo})
    }
}

export default new CartServices()