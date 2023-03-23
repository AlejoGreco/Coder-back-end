import MongoDbContainer from '../../containers/MongoDbContainer.js'
import UserSchema from '../../schemas/userSchema.js'
import mongoose from 'mongoose'
import { CONNECTION_STR } from '../../config.js'
import ErrorDto from '../../dtos/ErrorDto.js'

class UserMongoDao {
    constructor(dbName){
        this.db = mongoose.createConnection(CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        })
        this.container = new MongoDbContainer(this.db.model('user', UserSchema))
    }

    async getUser(query){
        try{
            const product = await this.container.readOne(query)
            return product
        }
        catch (e){
            throw new ErrorDto({params: {query}, app: e}, 'No se pudo obtener el usuario | Lanzado por aplicacion', 400, -600)
        }
    }

    async createUser(user){
        try{
            const result = await this.container.create(user)
            if(!result)
                throw new ErrorDto({params: {user}},'No se pudo crear usuario', 400, -61)
            
            return result
        }
        catch (e){
            if(!e.error?.params){
                throw new ErrorDto({params: {user}, app: e}, 'No se pudo crear usuario | Lanzado por aplicacion', 400, -610)
            }
            throw e
        }
    }
}

export default UserMongoDao
