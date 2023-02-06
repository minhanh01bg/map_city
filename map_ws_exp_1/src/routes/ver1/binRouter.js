const express = require('express');

const binController = require('../../controllers/ver1/BinController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let binRouter = express.Router();

binRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    binController.addNewBin
);
binRouter.put(
    '/edit/:binId',
    MiddlewareController.verify_Token_Admin,
    binController.updateBinById
);
binRouter.delete(
    '/delete/:binId',
    MiddlewareController.verify_Token_Admin,
    binController.deleteBinById
);
binRouter.get(
    '/:binId',
    MiddlewareController.verify_Token_Admin,
    binController.getBinById
);
binRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    binController.getAllBin
);

module.exports = binRouter;
