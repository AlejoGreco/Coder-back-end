import productService from "../services/productService.js";
import ErrorDto from "../dtos/ErrorDto.js";

class ProductController {
    constructor(){
        this.service = productService
    }

    getProducts = async (req, res) => {
        try{
            const result = await this.service.getProducts()
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: getProducts`, 400, 700)
            return res.status(status).send(rest)
        }
    }

    getProduct = async (req, res) => {
        try{
            const result = await this.service.getProduct(req.params.id)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: getProduct`, 400, 710)
            return res.status(status).send(rest)
        }
    }

    createProduct = async (req, res) => {
        try{
            const result = await this.service.createProduct(req.body)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {body: req.body}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: createProduct`, 400, 720)
            return res.status(status).send(rest)
        }
    }

    updateProduct = async (req, res) => {
        try{
            const result = await this.service.updateProduct(req.params.id, req.body)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id, body: req.body}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: updateProduct`, 400, 730)
            return res.status(status).send(rest)
        }
    }

    deleteProduct = async (req, res) => {
        try{
            const result = await this.service.deleteProduct(req.params.id)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: deleteProduct`, 400, 740)
            return res.status(status).send(rest)
        }
    }
}

export default new ProductController()