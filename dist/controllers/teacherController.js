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
exports.TeacherController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/teacher/service");
const service_3 = require("../modules/users/service");
class TeacherController {
    constructor() {
        this.user_service = new service_2.default();
        this.student_service = new service_3.default();
    }
    getStudents(student) {
        const students = [];
        for (let idx = 0; idx < student.length; idx++) {
            students.push({
                email: student[idx]
            });
        }
        return students;
    }
    create_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // this check whether all the filds were send through the erquest or not
            if (req.body.teacher) {
                const user_params = {
                    email: req.body.teacher,
                    students: this.getStudents(req.body.students)
                };
                console.dir(user_params);
                // create students in mongodb\
                yield this.student_service.createUser(req.body.students, (err, user_data) => {
                    if (user_data) {
                        let obj = {};
                        obj['email'] = user_params.email;
                        obj['students'] = user_data;
                        this.user_service.createUser(obj, (err, data) => {
                            if (err) {
                                service_1.mongoError(err, res);
                            }
                            else {
                                service_1.successResponse('create teacher successfull', data, res);
                            }
                        });
                    }
                    else {
                        service_1.failureResponse('something went wrong', user_data, res);
                    }
                });
                // get those newly created students and put the object in teacher
                // and create teacher object with
            }
            else {
                // error response if some fields are missing in request body
                service_1.insufficientParameters(res);
            }
        });
    }
    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('get user successfull', user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update_user(req, res) {
        if (req.body.email) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (user_data) {
                    const user_params = {
                        _id: req.params.id,
                        email: req.body.email ? req.body.email : user_data.email,
                        students: req.body.students ? req.body.students : user_data.students
                    };
                    this.user_service.updateUser(user_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update user successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_user(req, res) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete user successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_common_student(req, res) {
        if (req.query) {
            const user_filter = { email: { $in: req.query.teacher } };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    var studentArrays = [];
                    for (const property in user_data) {
                        studentArrays[property] = user_data[property].students;
                        console.log("===========ewew", ...studentArrays);
                        // console.log("=============", user_data[property].students)
                    }
                    console.log("===========ewew2", ...studentArrays.join(","));
                    // var intersection = _.intersection.apply(_, ...studentArrays);
                    // console.log("=====================", intersection)
                    service_1.successResponse('get user successfull', user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    send_notification(req, res) {
        if (req.query) {
            const user_filter = { email: req.body.teacher };
            this.user_service.notify(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    var studentArrays = [];
                    for (const property in user_data) {
                        studentArrays[property] = user_data[property].students;
                        console.log("===========ewew", ...studentArrays);
                        // console.log("=============", user_data[property].students)
                    }
                    console.log("===========ewew2", ...studentArrays.join(","));
                    // var intersection = _.intersection.apply(_, ...studentArrays);
                    // console.log("=====================", intersection)
                    service_1.successResponse('get user successfull', user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.TeacherController = TeacherController;
