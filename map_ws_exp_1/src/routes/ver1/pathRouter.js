const express = require('express');

const pathController = require('../../controllers/ver1/PathController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let pathRouter = express.Router();

pathRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    pathController.addNewPath
);
pathRouter.put(
    '/edit/:pathId',
    MiddlewareController.verify_Token_Admin,
    pathController.updatePathById
);
pathRouter.delete(
    '/delete/:pathId',
    MiddlewareController.verify_Token_Admin,
    pathController.deletePathById
);
pathRouter.get(
    '/:pathId',
    MiddlewareController.verify_Token_Admin,
    pathController.getPathById
);
pathRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    pathController.getAllPath
);

module.exports = pathRouter;
