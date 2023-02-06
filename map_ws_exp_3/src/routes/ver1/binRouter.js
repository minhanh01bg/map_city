const express = require('express');

const BinController = require('../../controllers/ver1/BinController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let binRouter = express.Router();

binRouter.post(
    '/add',
    MiddlewareController.verify_Token_Manager_Admin,
    BinController.addNewBin
);
binRouter.put(
    '/edit/:binId',
    MiddlewareController.verify_Token,
    BinController.updateBinById
);
binRouter.delete(
    '/delete/:binId',
    MiddlewareController.verify_Token,
    BinController.deleteBinById
);
binRouter.get(
    '/areas/:areaId',
    MiddlewareController.verify_Token,
    BinController.getAllBinByAreaId
);
binRouter.get(
    '/vehicles/:vehicleId',
    MiddlewareController.verify_Token,
    BinController.getAllBinByVehicleId
);
binRouter.get(
    '/:binId',
    MiddlewareController.verify_Token,
    BinController.getBinById
);
binRouter.get(
    '/',
    MiddlewareController.verify_Token_Manager_Admin,
    BinController.getAllBin
);

module.exports = binRouter;
