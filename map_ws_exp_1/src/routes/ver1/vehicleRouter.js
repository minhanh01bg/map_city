const express = require('express');

const vehicleController = require('../../controllers/ver1/VehicleController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let vehicleRouter = express.Router();

vehicleRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    vehicleController.addNewVehicle
);
vehicleRouter.put(
    '/edit/:vehicleId',
    MiddlewareController.verify_Token,
    vehicleController.updateVehicleById
);
vehicleRouter.delete(
    '/delete/:vehicleId',
    MiddlewareController.verify_Token_Admin,
    vehicleController.deleteVehicleById
);
vehicleRouter.get(
    '/:vehicleId',
    MiddlewareController.verify_Token_Admin,
    vehicleController.getVehicleById
);
vehicleRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    vehicleController.getAllVehicle
);

module.exports = vehicleRouter;
