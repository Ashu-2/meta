import { ITeacher } from './model';
import teachers from './schema';
import students from '../users/schema';

export default class TeacherService {
    
    public createUser(user_params: any, callback: any) {
        const _session = new teachers(user_params);
        _session.save(callback);
    }

    public filterUser(query: any, callback: any) {
        teachers.find(query, callback);
    }

    public updateUser(user_params: ITeacher, callback: any) {
        const query = {_id: user_params._id};
        teachers.findOneAndUpdate(query, callback);
    }
    
    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        teachers.deleteOne(query, callback);
    }
    public notify(user_params: any, callback: any) {
        
        // teachers.find(user_params)
        teachers.find(user_params).populate({
            path: 'users',
            match: { is_suspended: false }
        })
        .exec(function(err:any, data:any) {
        });
    }
    

}