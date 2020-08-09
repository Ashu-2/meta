import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IStudent } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

export class UserController {

    private user_service: UserService = new UserService();

    public create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.email) {
            const user_params: IStudent = {
                email: req.body.email
            };
            this.user_service.createUser(user_params, (err: any, user_data: IStudent) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create user successfull', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: IStudent) => {
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
            this.user_service.filterUser(user_filter, (err: any, user_data: IStudent) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    user_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'User data updated'
                    });
                    const user_params: IStudent = {
                        _id: req.params.id,
                        email: req.body.email ? req.body.email : user_data.email,
                        is_suspended: req.body.is_suspended ? req.body.is_suspended : user_data.is_suspended,
                        modification_notes: user_data.modification_notes
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

    public suspend_students(req: Request, res: Response) {
        if (req.body.students) {
            this.user_service.suspendUser(req.body.students, (err: any, details:any) => {
                if (err) {
                    mongoError(err, res);
                } else if (details) {
                    successResponse('student suspended successfully', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

}