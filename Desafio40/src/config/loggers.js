import log4js from "log4js";

log4js.configure({
    appenders: {
        console: { type: 'console' },
        fileWarning: { type: 'file', filename: 'src/logs/warnings.log'},
        fileError: { type: 'file', filename: 'src/logs/erros.log'},
    },
    categories: {
        default: { appenders: ['console'], level: 'all'},
        //all: { appenders: ['loggerConsole', 'loggerWarning', 'loggerError'], level: 'all'}
        console: { appenders: ['console'], level: 'all'},
        warning: { appenders: ['fileWarning', 'console'], level: 'warn'},
        error: { appenders: ['fileError', 'console'], level: 'error'}
    }
})

export const loggerAll = log4js.getLogger('console')
export const loggerWarn = log4js.getLogger('warning')
export const loggerError = log4js.getLogger('error')
