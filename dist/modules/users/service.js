"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class UserService {
    createUser(user_params, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { upsert: true };
            let arr = [];
            for (let student of user_params) {
                var user = new schema_1.default({ email: student });
                let docs = yield user.save(options);
                arr.push(docs._id);
            }
            Promise.all(arr).then(() => {
                callback(null, arr);
            });
        });
    }
    filterUser(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    updateUser(user_params, callback) {
        const query = { _id: user_params._id };
        schema_1.default.findOneAndUpdate(query, user_params, callback);
    }
    suspendUser(user_params, callback) {
        const query1 = { is_suspended: true };
        const query = { email: user_params };
        schema_1.default.findOneAndUpdate(query, query1, callback);
    }
    deleteUser(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = UserService;
