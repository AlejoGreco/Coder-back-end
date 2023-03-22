import daosFactory from "../daos/index.js"
import validationDtos from "../validations/validationDtos.js"
import ErrorDto from "../dtos/ErrorDto.js"

class ProductServices {
    constructor(){
        this.dao = daosFactory.getProductDao()
    }

    async getProducts(){
        return await this.dao.getAllProducts()
    }

    async getProduct(id){
        return await this.dao.getProduct(id)
    }

    async createProduct(product){
        try{
            await validationDtos.validateProductDto(product)
            product = { timestamp: Date.now(), ...product }
            return await this.dao.createProduct(product)
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({ 
                        params: { [e.path]: e.params.value ?  e.params.value : 'undefined'}
                    }, 
                    e.message, 400, -300)
            }
            throw e
        }
    }

    async updateProduct(id, product){
        try{
            await validationDtos.validateProductDto(product)
            const newProduct = { timestamp: Date.now(), ...product }
            return await this.dao.updateProduct(id, newProduct)
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({ 
                        params: { [e.path]: e.params.value ?  e.params.value : 'undefined'}
                    }, 
                    e.message, 400, -310)
            }
            throw e
        }
    }

    async deleteProduct(id){
        return await this.dao.deleteProduct(id)
    }
}

export default new ProductServices()