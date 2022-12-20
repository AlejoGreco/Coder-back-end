import { Router } from "express"
import { cpus } from "os"
import { random } from "../random.js"

const route = Router()

route.get('/info', (req, res) => {
    const args = process.argv.slice(2).length === 0 ? " - ": process.argv.slice(2).join(" - ")
    
    const processData = {
        args,
        platform: process.platform,
        node: process.version,
        memory: process.memoryUsage().rss,
        path: process.execPath,
        pid: process.pid,
        folder: process.cwd(),
        cpus: cpus().length
    }

    res.render('info', {
        ...processData
    })
})

route.get('/randoms', async (req, res) => {
    const amount = req.query.amount ? parseInt(req.query.amount) : 100000000
    const result = await random(amount)
    console.log(`Process Id: ${process.pid}`)
    res.render('random', {
        result,
        length: 1000
    })
})

export default route