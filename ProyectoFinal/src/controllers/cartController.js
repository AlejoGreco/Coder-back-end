import cartService from '../services/cartService.js'
import ErrorDto from '../dtos/ErrorDto.js'

class CartController {
    constructor(){
        this.service = cartService
    }

    createCart = async (req, res) => {
        try{
            const result = await this.service.createCart(req.body)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.body}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: createCart`, 400, 800)
            return res.status(status).send(rest)
        }
    }

    deleteCart = async (req, res) => {
        try{
            const result = await this.service.deleteCart(req.params.id)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: deleteCart`, 400, 810)
            return res.status(status).send(rest)
        }
    }

    readCartProducts = async (req, res) => {
        try{
            const result = await this.service.readCartProducts(req.params.id)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: readCartProducts`, 400, 820)
            return res.status(status).send(rest)
        }
    }

    addProductCart = async (req, res) => {
        try{
            const result = await this.service.addProductCart(req.params.id, req.body)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id, body: req.body}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: addProductCart`, 400, 830)
            return res.status(status).send(rest)
        }
    }

    deleteProductCart = async (req, res) => {
        try{
            const result = await this.service.deleteProductCart(req.params.id, req.params.id_prod)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {id: req.params.id, id_prod: req.params.id_prod}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: deleteProductCart`, 400, 840)
            return res.status(status).send(rest)
        }
    }

    collectCart = async (req, res) => {
        try{
            const result = await this.service.collectCart(req.user)
            res.send(result)
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: collectCart`, 400, 850)
            return res.status(status).send(rest)
        }
    }
}

export default new CartController()