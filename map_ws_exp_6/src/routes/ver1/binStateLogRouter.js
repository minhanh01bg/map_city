const express = require('express');

const BinStateLogController = require('../../controllers/ver1/BinStateLogController');
const MiddlewareController = require('../../controllers/MiddlewareController');

let binStateLogRouter = express.Router();

binStateLogRouter.post(
    '/add',
    MiddlewareController.verify_Token,
    BinStateLogController.addNewBinStateLog
);
binStateLogRouter.put(
    '/edit/:binStateLogId',
    MiddlewareController.verify_Token,
    BinStateLogController.updateBinStateLogById
);
binStateLogRouter.delete(
    '/delete/:binStateLogId',
    MiddlewareController.verify_Token,
    BinStateLogController.deleteBinStateLogById
);
binStateLogRouter.get(
    '/recent/:binId',
    MiddlewareController.verify_Token,
    BinStateLogController.getTop10BinSateLogByBinId
);
binStateLogRouter.get(
    '/:binStateLogId',
    MiddlewareController.verify_Token,
    BinStateLogController.getBinStateLogById
);
binStateLogRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin,
    BinStateLogController.getAllBinStateLog
);

module.exports = binStateLogRouter;
