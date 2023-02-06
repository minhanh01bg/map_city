const express = require('express');

const binStateLogController = require('../../controllers/ver1/BinStateLogController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let binStateLogRouter = express.Router();

binStateLogRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin,
    binStateLogController.addNewBinStateLog
);
binStateLogRouter.put(
    '/edit/:binStateLogId',
    MiddlewareController.verify_Token_Admin,
    binStateLogController.updateBinStateLogById
);
binStateLogRouter.delete(
    '/delete/:binStateLogId',
    MiddlewareController.verify_Token_Admin,
    binStateLogController.deleteBinStateLogById
);
binStateLogRouter.get(
    '/:binStateLogId',
    MiddlewareController.verify_Token_Admin,
    binStateLogController.getBinStateLogById
);
binStateLogRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    binStateLogController.getAllBinStateLog
);

module.exports = binStateLogRouter;
