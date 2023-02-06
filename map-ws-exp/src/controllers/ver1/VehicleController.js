const {
    ADM_Vehicle,
    SUP_Vehicle_Position,
    ADM_Task,
    ADM_User
} = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewVehicle = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newVehicleData = req.body;
        newVehicleData.image =
            req?.files?.vehicle?.[0]?.filename || 'default_vehicle.png';
        console.log(newVehicleData);
        if (
            !newVehicleData.engineHours ||
            !newVehicleData.engineId ||
            !newVehicleData.engineType ||
            !newVehicleData.model ||
            !newVehicleData.height ||
            !newVehicleData.length ||
            !newVehicleData.width ||
            !newVehicleData.odometer ||
            !newVehicleData.plate ||
            !newVehicleData.tonnage
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newVehicle = new ADM_Vehicle({
            engineHours: newVehicleData.engineHours,
            engineId: newVehicleData.engineId,
            engineType: newVehicleData.engineType,
            model: newVehicleData.model,
            height: newVehicleData.height,
            length: newVehicleData.length,
            width: newVehicleData.width,
            odometer: newVehicleData.odometer,
            plate: newVehicleData.plate,
            tonnage: newVehicleData.tonnage,
            image: newVehicleData.image,
            description: newVehicleData?.description,
            status: 'off'
        });
        let resData = newVehicle.dataValues;
        await newVehicle.save();
        let newVehiclePosition = new SUP_Vehicle_Position({
            latitude: newVehicleData?.latitude,
            longitude: newVehicleData?.longitude,
            vehicleId: resData.id
        });
        await newVehiclePosition.save();
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
        let vehicle = await ADM_Vehicle.findOne({
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
        await ADM_Vehicle.destroy({
            where: {
                id: req.params.vehicleId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK'
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
        let vehicle = await ADM_Vehicle.findOne({
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
        if (req.files == undefined) {
            newVehicleData.image = vehicle.image;
        } else {
            newVehicleData.image = req?.files?.vehicle?.[0]?.filename;
        }
        if (
            !newVehicleData.engineHours ||
            !newVehicleData.engineId ||
            !newVehicleData.engineType ||
            !newVehicleData.model ||
            !newVehicleData.height ||
            !newVehicleData.length ||
            !newVehicleData.width ||
            !newVehicleData.odometer ||
            !newVehicleData.plate ||
            !newVehicleData.tonnage
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await ADM_Vehicle.update(
            {
                engineHours: newVehicleData.engineHours,
                engineId: newVehicleData.engineId,
                engineType: newVehicleData.engineType,
                model: newVehicleData.model,
                height: newVehicleData.height,
                length: newVehicleData.length,
                width: newVehicleData.width,
                odometer: newVehicleData.odometer,
                plate: newVehicleData.plate,
                tonnage: newVehicleData.tonnage,
                image: newVehicleData.image,
                description: newVehicleData?.description,
                status: newVehicleData?.status
            },
            {
                where: {
                    id: req.params.vehicleId
                },
                raw: true
            }
        );
        let resData = await ADM_Vehicle.findOne({
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
        let vehicles = await ADM_Vehicle.findAll({
            raw: true
        });
        if (!vehicles) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Vehicle not found.'
            });
        }
        for (let i = 0; i < vehicles.length; i++) {
            let vehiclePosition = await SUP_Vehicle_Position.findOne({
                where: {
                    vehicleId: vehicles[i].id
                },
                raw: true
            });
            vehicles[i].latitude = vehiclePosition.latitude;
            vehicles[i].longitude = vehiclePosition.longitude;
            let task = await ADM_Task.findOne({
                where: {
                    vehicleId: vehicles[i].id,
                    status: 'on'
                }, 
                raw: true
            });
            vehicles[i].driver = await ADM_User.findOne({
                where: {
                    id: task.driverId
                },
                raw: true
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicles
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
        let vehicle = await ADM_Vehicle.findOne({
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
        let vehiclePosition = await SUP_Vehicle_Position.findOne({
            where: {
                vehicleId: vehicle.id
            },
            raw: true
        });
        vehicle.latitude = vehiclePosition.latitude;
        vehicle.longitude = vehiclePosition.longitude;
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
