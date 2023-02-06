const express = require('express');

const AreaController = require('../../controllers/ver1/AreaController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let areaRouter = express.Router();

areaRouter.post(
    '/add',
    MiddlewareController.verify_Token_Manager_Admin,
    AreaController.addNewArea
);
areaRouter.put(
    '/edit/:areaId',
    MiddlewareController.verify_Token_Manager_Admin,
    AreaController.updateAreaById
);
areaRouter.delete(
    '/delete/:areaId',
    MiddlewareController.verify_Token_Manager_Admin,
    AreaController.deleteAreaById
);
areaRouter.get(
    '/:areaId',
    MiddlewareController.verify_Token,
    AreaController.getAreaById
);
areaRouter.get(
    '/',
    MiddlewareController.verify_Token_Manager_Admin,
    AreaController.getAllArea
);

module.exports = areaRouter;
