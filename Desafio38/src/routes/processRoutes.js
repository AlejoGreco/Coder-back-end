import { Router } from "express"
import { getProcessData, performHeavyProcess } from "../services/process.services.js"

const route = Router()

route.get('/info', (req, res) => {    
    const processData = getProcessData()

    res.render('info', {
        ...processData
    })
})

route.get('/randoms', async (req, res) => {
    const amount = req.query.amount ? parseInt(req.query.amount) : 100000000
    const result = await performHeavyProcess(amount)

    res.render('random', {
        result,
        length: 1000
    })
})

export default route