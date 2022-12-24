import { loggerAll } from "../config/loggers.js"

export const logInfo = (req, res, next) => {
    loggerAll.info(`Peticon a ruta -> url: ${req.url} | method: ${req.method}`)
    next()
}