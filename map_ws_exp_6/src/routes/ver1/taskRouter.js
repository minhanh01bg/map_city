const express = require('express');

const TaskController = require('../../controllers/ver1/TaskController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let taskRouter = express.Router();

taskRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    TaskController.addNewTask
);
taskRouter.put(
    '/edit/:taskId',
    MiddlewareController.verify_Token_Admin,
    TaskController.updateTaskById
);
taskRouter.delete(
    '/delete/:taskId',
    MiddlewareController.verify_Token_Admin,
    TaskController.deleteTaskById
);
taskRouter.get(
    '/today',
    MiddlewareController.verify_Token_Admin,
    TaskController.getAllTodayTask
);
taskRouter.get(
    '/:taskId',
    MiddlewareController.verify_Token_Admin,
    TaskController.getTaskById
);
taskRouter.get(
    '/recent/:userId',
    MiddlewareController.verify_Token_Admin,
    TaskController.getTop10TaskByUserId
);
taskRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    TaskController.getAllTask
);

module.exports = taskRouter;
