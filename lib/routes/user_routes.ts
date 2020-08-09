import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { TeacherController } from '../controllers/teacherController';

export class TestRoutes {

    private user_controller: UserController = new UserController();
    private teacher_controller: TeacherController = new TeacherController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            console.log("-----------------")
            this.user_controller.create_user(req, res);
        });

        app.get('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.get_user(req, res);
        });

        app.put('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.update_user(req, res);
        });

        app.delete('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.delete_user(req, res);
        });

        app.post('/api/register', (req: Request, res: Response) => {
            this.teacher_controller.create_user(req, res);
        });

        app.get('/api/teacher/:id', (req: Request, res: Response) => {
            this.teacher_controller.get_user(req, res);
        });
        app.get('/api/commonstudents/', (req:Request, res:Response) => {
            console.log("==============")
            this.teacher_controller.get_common_student(req, res);
        });
        app.post('/api/suspend/', (req:Request, res:Response) => {
            console.log("==============")
            this.user_controller.suspend_students(req, res);
        });
        app.post('/api/retrievefornotifications', (req:Request, res:Response) => {
            console.log("==============")
            this.teacher_controller.send_notification(req, res);
        });

    }
}