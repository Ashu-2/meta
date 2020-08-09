import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ITeacher } from '../modules/teacher/model';
import TeacherService from '../modules/teacher/service';
import StudentService from '../modules/users/service';
import e = require('express');
import _ = require('lodash');
import { IStudent } from 'modules/users/model';

export class TeacherController {

    private user_service: TeacherService = new TeacherService();
    private student_service: StudentService = new StudentService();

    private getStudents(student: [string]) : IStudent[] {
        const students : IStudent[] = [];
        for( let idx = 0; idx < student.length; idx++) {
            students.push({
                email: student[idx]
            }  as IStudent
            );
        }
        return students;
    }
    public async create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.teacher) {
            
            const user_params: any = {
                email: req.body.teacher,
                students: this.getStudents(req.body.students)
            };
            console.dir(user_params);
            // create students in mongodb\
            await this.student_service.createUser(req.body.students, (err: any, user_data: IStudent)=> {
                if (user_data) {
                    let obj = {}
                    obj['email'] = user_params.email
                    obj['students'] = user_data
                    this.user_service.createUser(obj, (err: any, data: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('create teacher successfull', data, res);
                        }
                    });
                } else {
                    failureResponse('something went wrong', user_data, res);
                }

            })
            // get those newly created students and put the object in teacher
            // and create teacher object with

        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: ITeacher) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_user(req: Request, res: Response) {
        if (req.body.email ) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: ITeacher) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    const user_params: ITeacher = {
                        _id: req.params.id,
                        email: req.body.email ? req.body.email : user_data.email,
                        students: req.body.students ? req.body.students : user_data.students
                    };
                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_common_student(req: Request, res: Response) {
        if (req.query) {
            const user_filter = { email: { $in : req.query.teacher }};
            
            this.user_service.filterUser(user_filter, (err: any, user_data: ITeacher) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    var studentArrays:any = [];
                    for (const property in user_data) {
                        studentArrays[property] = user_data[property].students;
                        console.log("===========ewew", ...studentArrays);
                        // console.log("=============", user_data[property].students)
                    }
                    console.log("===========ewew2", ...studentArrays.join(","));
                    // var intersection = _.intersection.apply(_, ...studentArrays);
                    // console.log("=====================", intersection)
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public send_notification(req: Request, res: Response) {
        if (req.query) {
            const user_filter:any = { email: req.body.teacher };
            
            this.user_service.notify(user_filter, (err: any, user_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    var studentArrays:any = [];
                    for (const property in user_data) {
                        studentArrays[property] = user_data[property].students;
                        console.log("===========ewew", ...studentArrays);
                        // console.log("=============", user_data[property].students)
                    }
                    console.log("===========ewew2", ...studentArrays.join(","));
                    // var intersection = _.intersection.apply(_, ...studentArrays);
                    // console.log("=====================", intersection)
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    
}