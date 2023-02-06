import axios from 'axios'

export default class AxiosClient {
    constructor({host, port}){
        this.url = `${host}:${port}`
    }

    async get(path, param){
        try {
            if(param){
                return await (await axios.get(`${this.url}/${path}/${param}`)).data
            }
            return await (await axios.get(`${this.url}/${path}`)).data
        }
        catch (e){
            return {error: e.messaje}
        }
    }

    async post(path, body){
        try{
            return await (await axios.post(`${this.url}/${path}`, body)).data
        }
        catch (e){
            return {error: e.messaje}
        }
    }
}