import cluster from 'cluster'
import os from 'os'
import app from './app.js'
import logger from './logger/index.js'
import { PORT } from './config.js'

const CLUSTER = false
const cpuNumbers = os.cpus().length

if(cluster.isPrimary && CLUSTER){
    logger.info(`Iniciando workers. Pid maestro: ${process.pid}`)
    for(let i = 0; i < cpuNumbers; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        logger.warning(`Termino el worker ${worker.id}`)
        cluster.fork()
    })
}
else{
    const server = app.listen(PORT, () => logger.info(`Worker ${process.pid} iniciado. Listening at port ${PORT}`))
    server.on('error', e => logger.error(e))
}
