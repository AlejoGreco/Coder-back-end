import { Router } from "express"
import { getRandomDataController, getProcessDataController } from "../controllers/process.controller.js"

const route = Router()

route.get('/info', getProcessDataController)
route.get('/randoms', getRandomDataController)

export default route