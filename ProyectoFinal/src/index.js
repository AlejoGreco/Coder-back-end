import cluster from 'cluster'
import app from './app.js'
import { PORT } from './config.js'

// Server up
const server = app.listen(PORT, () => console.log(`Server up! Listening at port ${PORT}`))

server.on('error', e => console.log(e))