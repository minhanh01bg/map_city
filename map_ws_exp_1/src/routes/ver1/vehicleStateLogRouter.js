const express = require('express');

const vehicleStateLogController = require('../../controllers/ver1/VehicleStateLogController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let vehicleStateLogRouter = express.Router();

vehicleStateLogRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    vehicleStateLogController.addNewVehicleStateLog
);
vehicleStateLogRouter.put(
    '/edit/:vehicleStateLogId',
    MiddlewareController.verify_Token_Admin,
    vehicleStateLogController.updateVehicleStateLogById
);
vehicleStateLogRouter.delete(
    '/delete/:vehicleStateLogId',
    MiddlewareController.verify_Token_Admin,
    vehicleStateLogController.deleteVehicleStateLogById
);
vehicleStateLogRouter.get(
    '/:vehicleStateLogId',
    MiddlewareController.verify_Token_Admin,
    vehicleStateLogController.getVehicleStateLogById
);
vehicleStateLogRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    vehicleStateLogController.getAllVehicleStateLog
);

module.exports = vehicleStateLogRouter;
