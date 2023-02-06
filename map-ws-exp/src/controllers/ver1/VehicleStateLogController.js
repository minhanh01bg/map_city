const { VehicleStateLog } = require('../../models/ver1/models');

// Create
const addNewVehicleStateLog = async (req, res) => {
    try {
        let newVehicleStateLogData = req.body;
        if (
            !newVehicleStateLogData.latitude ||
            !newVehicleStateLogData.longitude ||
            !newVehicleStateLogData.altitude ||
            !newVehicleStateLogData.speed ||
            !newVehicleStateLogData.angle ||
            !newVehicleStateLogData.odometer ||
            !newVehicleStateLogData.status
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newVehicleStateLog = new VehicleStateLog({
            latitude: newVehicleStateLogData.latitude,
            longitude: newVehicleStateLogData.longitude,
            altitude: newVehicleStateLogData.altitude,
            speed: newVehicleStateLogData.speed,
            angle: newVehicleStateLogData.angle,
            odometer: newVehicleStateLogData.odometer,
            description: newVehicleStateLogData.description,
            status: newVehicleStateLogData.status
        });
        let resData = newVehicleStateLog.dataValues;
        await newVehicleStateLog.save();
        delete resData.password;
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
const deleteVehicleStateLogById = async (req, res) => {
    try {
        let vehicleStateLog = await VehicleStateLog.findOne({
            where: {
                id: req.params.vehicleStateLogId
            },
            raw: true
        });
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        await VehicleStateLog.destroy({
            where: {
                id: req.params.vehicleStateLogId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateVehicleStateLogById = async (req, res) => {
    try {
        let vehicleStateLog = await VehicleStateLog.findOne({
            where: {
                id: req.params.vehicleStateLogId
            },
            raw: true
        });
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        let newVehicleStateLogData = req.body;
        if (
            !newVehicleStateLogData.latitude ||
            !newVehicleStateLogData.longitude ||
            !newVehicleStateLogData.altitude ||
            !newVehicleStateLogData.speed ||
            !newVehicleStateLogData.angle ||
            !newVehicleStateLogData.odometer ||
            !newVehicleStateLogData.status
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await VehicleStateLog.update(
            {
                latitude: newVehicleStateLogData.latitude,
                longitude: newVehicleStateLogData.longitude,
                altitude: newVehicleStateLogData.altitude,
                speed: newVehicleStateLogData.speed,
                angle: newVehicleStateLogData.angle,
                odometer: newVehicleStateLogData.odometer,
                description: newVehicleStateLogData.description,
                status: newVehicleStateLogData.status
            },
            {
                where: {
                    id: req.params.vehicleStateLogId
                },
                raw: true
            }
        );
        let resData = await VehicleStateLog.findOne({
            where: {
                id: req.params.vehicleStateLogId
            },
            raw: true
        });
        delete resData.password;
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
const getAllVehicleStateLog = async (req, res) => {
    try {
        let vehicleStateLog = await VehicleStateLog.findAll({
            raw: true
        });
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getTop10VehicleStateLogByVehicleId = async (req, res) => {
    try {
        let vehicleStateLog = await VehicleStateLog.findAll({
            where: {
                vehicleId: req.params.vehicleId
            },
            limit: 10,
            raw: true
        });
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getVehicleStateLogById = async (req, res) => {
    try {
        let vehicleStateLog = await VehicleStateLog.findOne({
            where: {
                id: req.params.vehicleStateLogId
            },
            raw: true
        });
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewVehicleStateLog,
    deleteVehicleStateLogById,
    updateVehicleStateLogById,
    getAllVehicleStateLog,
    getVehicleStateLogById,
    getTop10VehicleStateLogByVehicleId
};
