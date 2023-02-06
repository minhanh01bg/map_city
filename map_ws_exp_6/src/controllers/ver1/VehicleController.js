const { Vehicle } = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewVehicle = async (req, res) => {
    try {
        console.log(123);
        await uploadFile(req, res);
        console.log(123);
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let newVehicleData = req.body;
        newVehicleData.image = req.file.filename;
        console.log(newVehicleData);
        if (
            !newVehicleData.latitude ||
            !newVehicleData.longitude ||
            !newVehicleData.engineHours ||
            !newVehicleData.engineId ||
            !newVehicleData.engineType ||
            !newVehicleData.model ||
            !newVehicleData.odometer ||
            !newVehicleData.plate ||
            !newVehicleData.image
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newVehicle = new Vehicle({
            latitude: newVehicleData.latitude,
            longitude: newVehicleData.longitude,
            engineHours: newVehicleData.engineHours,
            engineId: newVehicleData.engineId,
            engineType: newVehicleData.engineType,
            model: newVehicleData.model,
            odometer: newVehicleData.odometer,
            plate: newVehicleData.plate,
            speed: newVehicleData.speed,
            altitude: newVehicleData.altitude,
            angle: newVehicleData.angle,
            image: newVehicleData.image,
            ignition: newVehicleData.ignition,
            status: newVehicleData.status
        });
        let resData = newVehicle.dataValues;
        await newVehicle.save();
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
const deleteVehicleById = async (req, res) => {
    try {
        let vehicle = await Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        await Vehicle.destroy({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicle
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateVehicleById = async (req, res) => {
    try {
        let vehicle = await Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        await uploadFile(req, res);
        let newVehicleData = req.body;
        if (req.file == undefined) {
            newVehicleData.image = vehicle.image;
        } else {
            newVehicleData.image = req.file.filename;
        }
        if (
            !newVehicleData.latitude ||
            !newVehicleData.longitude ||
            !newVehicleData.engineHours ||
            !newVehicleData.engineId ||
            !newVehicleData.engineType ||
            !newVehicleData.model ||
            !newVehicleData.odometer ||
            !newVehicleData.plate ||
            !newVehicleData.image
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Vehicle.update(
            {
                latitude: newVehicleData.latitude,
                longitude: newVehicleData.longitude,
                engineHours: newVehicleData.engineHours,
                engineId: newVehicleData.engineId,
                engineType: newVehicleData.engineType,
                model: newVehicleData.model,
                odometer: newVehicleData.odometer,
                plate: newVehicleData.plate,
                speed: newVehicleData.speed,
                altitude: newVehicleData.altitude,
                angle: newVehicleData.angle,
                image: newVehicleData.image,
                ignition: newVehicleData.ignition,
                status: newVehicleData.status
            },
            {
                where: {
                    id: req.params.vehicleId
                },
                raw: true
            }
        );
        let resData = await Vehicle.findOne({
            where: {
                id: req.params.vehicleId
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
const getAllVehicle = async (req, res) => {
    try {
        let vehicle = await Vehicle.findAll({
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicle
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getVehicleById = async (req, res) => {
    try {
        let vehicle = await Vehicle.findOne({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        if (!vehicle) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicle
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewVehicle,
    deleteVehicleById,
    updateVehicleById,
    getAllVehicle,
    getVehicleById
};
