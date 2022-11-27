import { Router } from "express"

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
        folder: process.cwd()
    }

    res.render('info', {
        ...processData
    })
})

route.get('/randoms', (req, res) => {
    
})

export default route