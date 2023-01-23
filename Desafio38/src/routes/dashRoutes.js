import { Router } from "express"
import { getDashboardController } from "../controllers/dash.controller.js"

const route = Router()

route.get('/', getDashboardController)

export default route