import { IStudent } from './model';
import users from './schema';

export default class UserService {
    
    public async createUser(user_params: any, callback: any) {
        let  options = { upsert: true };
        let arr = []
        for(let student of user_params) {
            var user = new users({email: student} )
            let docs = await user.save(options);
            arr.push(docs._id)
        }
        Promise.all(arr).then(() => {
            callback(null, arr)
        })
    }
    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public updateUser(user_params: IStudent, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public suspendUser(user_params: any, callback: any) {
        const query1 = {  is_suspended:true };
        const query = { email: user_params}
        users.findOneAndUpdate(query, query1, callback);
    }

    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}