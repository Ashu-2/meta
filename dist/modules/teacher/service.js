"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class TeacherService {
    createUser(user_params, callback) {
        const _session = new schema_1.default(user_params);
        _session.save(callback);
    }
    filterUser(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateUser(user_params, callback) {
        const query = { _id: user_params._id };
        schema_1.default.findOneAndUpdate(query, callback);
    }
    deleteUser(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
    notify(user_params, callback) {
        console.log("-------------------sfddf", user_params);
        // teachers.find(user_params)
        schema_1.default.find(user_params).populate({
            path: 'users',
            match: { is_suspended: false }
        })
            .exec(function (err, data) {
            console.log("---------------", data);
        });
    }
}
exports.default = TeacherService;
