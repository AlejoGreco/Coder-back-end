import log4js from "log4js";

log4js.configure({
    appenders: {
        /*loggerConsole: { type: 'console' },
        loggerFileWarning: { type: 'file', filename: 'src/logs/warnings.log'},
        loggerFileError: { type: 'file', filename: 'src/logs/erros.log'}*/

        console: { type: 'console' },
        fileWarning: { type: 'file', filename: 'src/logs/warnings.log'},
        fileError: { type: 'file', filename: 'src/logs/erros.log'},
        
        loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'all'},
        loggerWarning: { type: 'logLevelFilter', appender: 'fileWarning', level: 'warn'},
        loggerError: { type: 'logLevelFilter', appender: 'fileError', level: 'error'}

    },
    categories: {
        default: { appenders: ['loggerConsole'], level: 'trace'},
        all: { appenders: ['loggerConsole', 'loggerWarning', 'loggerError'], level: 'all'},

        /*all: { appenders: ['loggerConsole'], level: 'debug'},
        warnings: { appenders: ['loggerFileWarning'], level: 'warn'},
        errors: { appenders: ['loggerFileError'], level: 'error'},*/
    }
})

export default log4js.getLogger('all')

/*export const loggerError = log4js.getLogger('errors')
export const loggerWarning = log4js.getLogger('warnings')
export const loggerAll = log4js.getLogger('all')*/