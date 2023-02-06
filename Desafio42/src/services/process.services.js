import { cpus } from "os"

export const getProcessData = () => {
    const args = process.argv.slice(2).length === 0 ? " - ": process.argv.slice(2).join(" - ")
    
    return {
        args,
        platform: process.platform,
        node: process.version,
        memory: process.memoryUsage().rss,
        path: process.execPath,
        pid: process.pid,
        folder: process.cwd(),
        cpus: cpus().length
    }
}

export const performHeavyProcess = amount => {
    const result = {}
    for(let i = 0; i < amount; i++){
        const num = Math.round(Math.random() * 1000)
        if(result[num]){
            result[num] = result[num] + 1
        }
        else{
            result[num] = 1
        }
    }
    return Promise.resolve(result)
}