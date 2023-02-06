const express = require('express');

const VehicleStateLogController = require('../../controllers/ver1/VehicleStateLogController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let vehicleStateLogRouter = express.Router();

vehicleStateLogRouter.post(
    '/add',
    MiddlewareController.verify_Token,
    VehicleStateLogController.addNewVehicleStateLog
);
vehicleStateLogRouter.put(
    '/edit/:vehicleStateLogId',
    MiddlewareController.verify_Token,
    VehicleStateLogController.updateVehicleStateLogById
);
vehicleStateLogRouter.delete(
    '/delete/:vehicleStateLogId',
    MiddlewareController.verify_Token_Manager_Admin,
    VehicleStateLogController.deleteVehicleStateLogById
);
vehicleStateLogRouter.get(
    '/recent/:vehicleId',
    MiddlewareController.verify_Token,
    VehicleStateLogController.getTop10VehicleStateLogByVehicleId
);
vehicleStateLogRouter.get(
    '/:vehicleStateLogId',
    MiddlewareController.verify_Token,
    VehicleStateLogController.getVehicleStateLogById
);
vehicleStateLogRouter.get(
    '/',
    MiddlewareController.verify_Token,
    VehicleStateLogController.getAllVehicleStateLog
);

module.exports = vehicleStateLogRouter;
