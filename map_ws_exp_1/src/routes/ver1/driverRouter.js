const express = require('express');

const driverController = require('../../controllers/ver1/DriverController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let driverRouter = express.Router();

driverRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    driverController.addNewDriver
);
driverRouter.put(
    '/edit/:driverId',
    MiddlewareController.verify_Token_Admin,
    driverController.updateDriverById
);
driverRouter.delete(
    '/delete/:driverId',
    MiddlewareController.verify_Token_Admin,
    driverController.deleteDriverById
);
driverRouter.get(
    '/:driverId',
    MiddlewareController.verify_Token_Admin,
    driverController.getDriverById
);
driverRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    driverController.getAllDriver
);

module.exports = driverRouter;
