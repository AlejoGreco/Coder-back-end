import { createLogger, format, transports } from 'winston'


const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${new Date(timestamp).toLocaleString()} - [${level.toUpperCase()}] : ${message}`;
})

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({level: 'error', filename: './logs/error.log'}),
        new transports.File({level: 'warn', filename: './logs/warn.log'})
    ]
})

export default logger