import MongoDbContainer from '../../containers/MongoDbContainer.js'
import CartSchema from '../../schemas/cartSchema.js'
import mongoose from 'mongoose'
import { CONNECTION_STR } from '../../config.js'
import ErrorDto from '../../dtos/ErrorDto.js'

class CartMongoDao {
    constructor(dbName){
        this.db = mongoose.createConnection(CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        })
        this.container = new MongoDbContainer(this.db.model('Carts', CartSchema))
    }

    async createCart(emptyCart){
        try{
            const result = await this.container.create(emptyCart)
            if(!result)
                throw new ErrorDto({params: {emptyCart}}, 'No se pudo crear el carrito', 400, -10)

            return result
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({params: {emptyCart}, app: e}, 'No se pudo crear el carrito | Lanzado por aplicacion', 400, -100)
            }
            throw e
        }
    }

    async deleteCart(id){
        try{
            const result = await this.container.destroy(id)
            if(!result)
                throw new ErrorDto({params: {id}}, 'No se pudo eliminar el carrito', 400, -11)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({params: {id}, app: e}, 'No se pudo eliminar el carrito | Lanzado por aplicacion', 400, -110)
            }
            throw e
        }
    }

    async getCartProducts(id){
        try{
            const cart = await this.container.read(id)
            if(!cart)
                throw new ErrorDto({params: {id}}, 'No se pudo encontrar el carrito - GET', 400, -12)
            
            return cart['products']
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({params: {id}, app: e}, 'No se pudo encontrar el carrito | Lanzado por aplicacion', 400, -120)
            }
            throw e
        }
    }

    async addProduct2Cart(id, product){
        try{
            const cart = await this.container.read(id)
            if(!cart)
                throw new ErrorDto({params: {id, product}}, 'No se pudo obtener el carrito - ADD ', 400, -13)
            
            cart['products'].push(product)
            const result = await cart.save()

            if(!result)
                throw new ErrorDto({params: {id, product}}, 'No se pudo agregar el producto al carrito ', 400, -14)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({params: {id, product}, app: e}, 'No se pudo agregar el producto al carrito | Lanzado por aplicacion', 400, -130)
            }
            throw e
        }
    }

    async deleteProductFromCart(id, id_prod){
        try{
            const cart = await this.container.read(id)
            if(!cart)
                throw new ErrorDto({params: {id, id_prod}}, 'No se pudo obtener el carrito - DELETE', 400, -15)
            
            cart['products'].id(id_prod).remove()
            const result = await cart.save()

            if(!result)
                throw new ErrorDto({params: {id, id_prod}}, 'No se pudo eliminar el producto del carrito ', 400, -16)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({params: {id, id_prod}, app: e}, 'No se pudo eliminar el producto del carrito | Lanzado por aplicacion', 400, -150)
            }
            throw e
        }
    }
}

export default CartMongoDao
