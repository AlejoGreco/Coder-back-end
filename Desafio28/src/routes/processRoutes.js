import { Router } from "express"
import { fork } from "child_process"

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
    const amount = req.query.amount ? parseInt(req.query.amount) : 200000
    const child = fork('./src/random.js')

    child.on('message', msg => {
        if(msg === 'ready'){
            console.log('Iniciando proceso hijo')
            child.send({amount})
        }
        else {
            res.render('random', msg)
        }
    })
})

export default route