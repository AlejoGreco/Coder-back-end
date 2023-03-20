import MongoDbContainer from '../../containers/MongoDbContainer.js'
import ProductSchema from '../../schemas/productSchema.js'
import mongoose from 'mongoose'
import { CONNECTION_STR } from '../../config.js'
import ErrorDto from '../../dtos/ErrorDto.js'

class ProductMongoDao {
    constructor(dbName){
        this.db = mongoose.createConnection(CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        })
        this.container = new MongoDbContainer(this.db.model('Products', ProductSchema))
    }

    async getAllProducts(){
        try{
            const products = await this.container.read()
            if(!products)
                throw new ErrorDto({params: {}},'No se pudo obtener productos', 400, -20)
            
            return products
        }
        catch (e){
            if(!e.error?.params){
                return new ErrorDto(e, 'No se pudo obtener productos | Lanzado por aplicacion', 400, -200)
            }
            return e
        }
    }

    async getProduct(id){
        try{
            const product = await this.container.read(id)
            if(!product)
                throw new ErrorDto({params: {id}},'No se pudo obtener producto', 400, -21)
            
            return product
        }
        catch (e){
            if(!e.error?.params){
                return new ErrorDto(e, 'No se pudo obtener producto | Lanzado por aplicacion', 400, -210)
            }
            return e
        }
    }

    async createProduct(product){
        try{
            const result = await this.container.create(product)
            if(!result)
                throw new ErrorDto({params: {product}},'No se pudo crear producto', 400, -22)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                return new ErrorDto(e, 'No se pudo crear producto | Lanzado por aplicacion', 400, -220)
            }
            return e
        }
    }

    async updateProduct(id, product){ 
        try{
            const result = await this.container.update(id, product)
            if(!result)
                throw new ErrorDto({params: {id, product}},'No se pudo actualizar el producto', 400, -23)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                return new ErrorDto(e, 'No se pudo actualizar producto | Lanzado por aplicacion', 400, -230)
            }
            return e
        }
    }

    async deleteProduct(id){
        try{
            const result = await this.container.destroy(id)
            if(!result)
                throw new ErrorDto({params: {id}},'No se pudo eliminar el producto', 400, -24)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                return new ErrorDto(e, 'No se pudo eliminar producto | Lanzado por aplicacion', 400, -240)
            }
            return e
        }
    }
}

export default ProductMongoDao
