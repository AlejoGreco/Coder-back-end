import log4js from "log4js";

log4js.configure({
    appenders: {
        console: { type: 'console' },
        fileWarning: { type: 'file', filename: 'src/logs/warnings.log'},
        fileError: { type: 'file', filename: 'src/logs/erros.log'},
        
        loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'all'},
        loggerWarning: { type: 'logLevelFilter', appender: 'fileWarning', level: 'warn'},
        loggerError: { type: 'logLevelFilter', appender: 'fileError', level: 'error'}

    },
    categories: {
        default: { appenders: ['loggerConsole'], level: 'all'},
        all: { appenders: ['loggerConsole', 'loggerWarning', 'loggerError'], level: 'all'}
    }
})

export default log4js.getLogger('all')