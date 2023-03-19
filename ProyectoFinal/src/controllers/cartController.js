import cartService from '../services/cartService.js'

class CartController {
    constructor(){
        this.service = cartService
    }

    createCart = async (req, res) => {
        const result = await this.service.createCart(req.body)
        res.send(result)
    }

    deleteCart = async (req, res) => {
        const result = await this.service.deleteCart(req.params.id)
        res.send(result)
    }

    readCartProducts = async (req, res) => {
        const result = await this.service.readCartProducts(req.params.id)
        res.send(result)
    }

    addProductCart = async (req, res) => {
        const result = await this.service.addProductCart(req.params.id, req.body)
        res.send(result)
    }

    deleteProductCart = async (req, res) => {
        const result = await this.service.deleteProductCart(req.params.id, req.params.id_prod)
        res.send(result)
    }

    collectCart = async (req, res) => {
        const result = await this.service.collectCart(req.user)
        res.send(result)
    }
}

export default new CartController()