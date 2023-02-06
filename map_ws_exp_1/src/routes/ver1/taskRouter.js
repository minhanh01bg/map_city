const express = require('express');

const taskController = require('../../controllers/ver1/TaskController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let taskRouter = express.Router();

taskRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    taskController.addNewTask
);
taskRouter.put(
    '/edit/:taskId',
    MiddlewareController.verify_Token_Admin,
    taskController.updateTaskById
);
taskRouter.delete(
    '/delete/:taskId',
    MiddlewareController.verify_Token_Admin,
    taskController.deleteTaskById
);
taskRouter.get(
    '/:taskId',
    MiddlewareController.verify_Token_Admin,
    taskController.getTaskById
);
taskRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    taskController.getAllTask
);

module.exports = taskRouter;
