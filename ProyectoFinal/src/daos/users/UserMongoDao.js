import MongoDbContainer from "../../containers/MongoDbContainer.js"
import UserSchema from "../../schemas/userSchema.js"

class UserMongoDao extends MongoDbContainer {
    constructor(collectionName, dbName){
        super(UserSchema, collectionName, dbName)   
    }
}

export default UserMongoDao