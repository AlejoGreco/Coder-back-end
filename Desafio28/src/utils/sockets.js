import fs from 'fs'

export const readChatMsg = async path => {
    try{
        if(fs.existsSync(path)){
            const messages= JSON.parse(await fs.promises.readFile(path))
            return messages            
        }
        else { return [] }
    }
    catch (e){
        throw {error : e.code, msg : 'Error leyendo archivo de hisorial de chat'}
    }
}

export const writeChatMsg = async (path, messages) => {
    try{
        await fs.promises.writeFile(path, JSON.stringify(messages, null, 2))
    }
    catch (e){
        throw {error : e.code, msg : 'Error escribiendo archivo de hisorial de chat'}
    }

}