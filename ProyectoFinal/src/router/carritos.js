import { Router }  from 'express'
import cartController from '../controllers/cartController.js'

const route = Router()

route.post('/', cartController.createCart)
route.delete('/:id', cartController.deleteCart)
route.get('/:id/productos', cartController.readCartProducts)
route.post('/:id/productos', cartController.addProductCart)
route.delete('/:id/productos/:id_prod', cartController.deleteProductCart)
route.post('/:id/collect', cartController.collectCart)

export default route