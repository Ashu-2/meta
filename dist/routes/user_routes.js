"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutes = void 0;
const userController_1 = require("../controllers/userController");
const teacherController_1 = require("../controllers/teacherController");
class TestRoutes {
    constructor() {
        this.user_controller = new userController_1.UserController();
        this.teacher_controller = new teacherController_1.TeacherController();
    }
    route(app) {
        app.post('/api/user', (req, res) => {
            console.log("-----------------");
            this.user_controller.create_user(req, res);
        });
        app.get('/api/user/:id', (req, res) => {
            this.user_controller.get_user(req, res);
        });
        app.put('/api/user/:id', (req, res) => {
            this.user_controller.update_user(req, res);
        });
        app.delete('/api/user/:id', (req, res) => {
            this.user_controller.delete_user(req, res);
        });
        app.post('/api/register', (req, res) => {
            this.teacher_controller.create_user(req, res);
        });
        app.get('/api/teacher/:id', (req, res) => {
            this.teacher_controller.get_user(req, res);
        });
        app.get('/api/commonstudents/', (req, res) => {
            console.log("==============");
            this.teacher_controller.get_common_student(req, res);
        });
        app.post('/api/suspend/', (req, res) => {
            console.log("==============");
            this.user_controller.suspend_students(req, res);
        });
        app.post('/api/retrievefornotifications', (req, res) => {
            console.log("==============");
            this.teacher_controller.send_notification(req, res);
        });
    }
}
exports.TestRoutes = TestRoutes;
