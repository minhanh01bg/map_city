const express = require('express');

const UserController = require('../../controllers/ver1/UserController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let userRouter = express.Router();
// Create
userRouter.post(
    '/drivers/add',
    MiddlewareController.verify_Token_Manager_Admin,
    UserController.addNewDriver
);
userRouter.post(
    '/managers/add',
    MiddlewareController.verify_Token_Admin,
    UserController.addNewManager
);
// Update
userRouter.put(
    '/drivers/edit/:userId',
    MiddlewareController.verify_Token_UserId_Manager_Admin,
    UserController.updateDriverById
);
userRouter.put(
    '/manager/edit/:userId',
    MiddlewareController.verify_Token_UserId_Admin,
    UserController.updateManagerById
);
// Delete
userRouter.delete(
    '/drivers/delete/:userId',
    MiddlewareController.verify_Token_Manager_Admin,
    UserController.deleteDriverById
);
userRouter.delete(
    '/managers/delete/:userId',
    MiddlewareController.verify_Token_Admin,
    UserController.deleteManagerById
);
// Read
userRouter.get(
    '/drivers/:userId',
    MiddlewareController.verify_Token_UserId_Manager_Admin,
    UserController.getDriverById
);
userRouter.get(
    '/managers/:userId',
    MiddlewareController.verify_Token_UserId_Admin,
    UserController.getManagerById
);
userRouter.get(
    '/admins/:userId',
    MiddlewareController.verify_Token_UserId_Admin,
    UserController.getAdminById
);
userRouter.get(
    '/drivers',
    MiddlewareController.verify_Token_Manager_Admin,
    UserController.getAllDriver
);
userRouter.get(
    '/managers',
    MiddlewareController.verify_Token_Admin,
    UserController.getAllManager
);

module.exports = userRouter;
