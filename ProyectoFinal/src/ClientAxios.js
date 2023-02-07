import axios from 'axios'

export default class AxiosClient {
    constructor({host, port}){
        this.url = `http://${host}:${port}`
        this.ready = false
        this.options
    }

    async init(auth, credentials){
        try{
            if(auth !== null && credentials !== null){
                const result = await axios.post(`${this.url}/${auth}`, credentials)
                const cookies = result.headers['set-cookie'].toString().split(';')[0].concat(';')
                this.options = {
                    headers: {
                        Cookie: cookies
                    }
                }
                this.ready = true
                console.log('Logged in!')
                return result.data
            }
        }
        catch (e){
            console.log({error: e})
            return -1
        }
    }

    isReady(){
        return this.ready
    }

    async get(path){
        try {
            return await axios.get(`${this.url}/${path}`, this.options)
        }
        catch (e){
            return {error: e}
        }
    }

    async post(path, body){
        try{
            return await axios.post(`${this.url}/${path}`, body, this.options)
        }
        catch (e){
            return {error: e}
        }
    }

    async put(path, body){
        try{
            return await axios.put(`${this.url}/${path}`, body, this.options)
        }
        catch (e){
            return {error: e}
        }
    }
    async delete(path){
        try{
            return await axios.delete(`${this.url}/${path}`, this.options)
        }
        catch (e){
            return {error: e}
        }
    }
}