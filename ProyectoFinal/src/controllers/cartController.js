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
}

export default new CartController()