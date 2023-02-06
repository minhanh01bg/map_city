const { BinStateLog } = require('../../models/ver1/models');

// Create
const addNewBinStateLog = async (req, res) => {
    try {
        let newBinStateLogData = req.body;
        if (
            !newBinStateLogData.latitude ||
            !newBinStateLogData.longitude ||
            !newBinStateLogData.weight ||
            !newBinStateLogData.status ||
            !newBinStateLogData.binId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newBinStateLog = new BinStateLog({
            latitude: newBinStateLogData.latitude,
            longitude: newBinStateLogData.longitude,
            weight: newBinStateLogData.weight,
            description: newBinStateLogData.description,
            status: newBinStateLogData.status,
            binId: newBinStateLogData.binId
        });
        let resData = newBinStateLog.dataValues;
        await newBinStateLog.save();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteBinStateLogById = async (req, res) => {
    try {
        let binStateLog = await BinStateLog.findOne({
            where: {
                id: req.params.binStateLogId
            },
            raw: true
        });
        if (!binStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        await BinStateLog.destroy({
            where: {
                id: req.params.binStateLogId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLog
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateBinStateLogById = async (req, res) => {
    try {
        let binStateLog = await BinStateLog.findOne({
            where: {
                id: req.params.binStateLogId
            },
            raw: true
        });
        if (!binStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        let newBinStateLogData = req.body;
        if (
            !newBinStateLogData.latitude ||
            !newBinStateLogData.longitude ||
            !newBinStateLogData.weight ||
            !newBinStateLogData.status
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await BinStateLog.update(
            {
                latitude: newBinStateLogData.latitude,
                longitude: newBinStateLogData.longitude,
                weight: newBinStateLogData.weight,
                description: newBinStateLogData.description,
                status: newBinStateLogData.status
            },
            {
                where: {
                    id: req.params.binStateLogId
                },
                raw: true
            }
        );
        let resData = await BinStateLog.findOne({
            where: {
                id: req.params.binStateLogId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllBinStateLog = async (req, res) => {
    try {
        let binStateLogs = await BinStateLog.findAll({
            raw: true
        });
        if (!binStateLogs) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLogs
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getBinStateLogById = async (req, res) => {
    try {
        let binStateLogs = await BinStateLog.findOne({
            where: {
                id: req.params.binStateLogId
            },
            raw: true
        });
        if (!binStateLogs) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLogs
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getTop10BinSateLogByBinId = async (req, res) => {
    try {
        let binStateLogs = await BinStateLog.findAll({
            where: {
                binId: req.params.binId
            },
            limit: 10,
            raw: true
        });
        if (!binStateLogs) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLogs
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewBinStateLog,
    deleteBinStateLogById,
    updateBinStateLogById,
    getAllBinStateLog,
    getBinStateLogById,
    getTop10BinSateLogByBinId
};
