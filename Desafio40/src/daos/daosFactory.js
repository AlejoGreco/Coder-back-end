import usersSchema from '../schemas/users.schema.js'

export default class DaosFactory {
    static getDao = async persistence => {
        switch (persistence) {
            case "ARRAY":
                //let { default: UsersDaoArray } = await import('./arrayDao.js')
                // let UsersDaoArray = await import('./userDaoArray.js')
                //return new UsersDaoArray()
            case "MONGO_DB": 
                let { default: UsersDaoDB } = await import('./mongoDao.js')
                return new UsersDaoDB(usersSchema, 'passport-auth', 'user')
        }
    }
}