import productService from "../services/ProductService.js";

class ProductController {
    constructor(){
        this.service = productService
    }

    getProducts = async (req, res) => {
        const result = await this.service.getProducts()
        res.send(result)
    }

    getProduct = async (req, res) => {
        const result = await this.service.getProduct(req.params.id)
        res.send(result)
    }
}

export default new ProductController()