import cluster from 'cluster'
import os from 'os'
import app from './app.js'
import { PORT } from './config.js'

const CLUSTER = false
const cpuNumbers = os.cpus().length

if(cluster.isPrimary && CLUSTER){
    console.log(`Iniciando workers. Pid maestro: ${process.pid}`)
    for(let i = 0; i < cpuNumbers; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        console.log(`Termino el worker ${worker.id}`)
        cluster.fork()
    })
}
else{
    const server = app.listen(PORT, () => console.log(`Worker ${process.pid} iniciado. Listening at port ${PORT}`))
    server.on('error', e => console.log(e))
}
