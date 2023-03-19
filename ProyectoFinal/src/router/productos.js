import { Router } from 'express'
import productController from '../controllers/productController.js'
import { checkAuthAdmin } from '../middlewares/auth.js'

const route = Router()

route.get('/', productController.getProducts)
route.get('/:id', productController.getProduct)
route.post('/', checkAuthAdmin, productController.createProduct)
route.put('/:id', checkAuthAdmin, productController.updateProduct)
route.delete('/:id', checkAuthAdmin, productController.deleteProduct)

export default route