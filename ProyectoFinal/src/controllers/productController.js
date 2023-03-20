import productService from "../services/productService.js";

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

    createProduct = async (req, res) => {
        const result = await this.service.createProduct(req.body)
        res.send(result)
    }

    updateProduct = async (req, res) => {
        const result = await this.service.updateProduct(req.params.id, req.body)
        res.send(result)
    }

    deleteProduct = async (req, res) => {
        const result = await this.service.deleteProduct(req.params.id)
        res.send(result)
    }
}

export default new ProductController()