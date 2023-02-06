const { Vehicle } = require('../../models/index');
const bcrypt = require('bcrypt');

// Create
const addNewVehicle = async (req, res) => {
    try {
        let newVehicleData = req.body;
        if (
            !newVehicleData.latitude ||
            !newVehicleData.longitude ||
            !newVehicleData.heigth ||
            !newVehicleData.maxWeight ||
            !newVehicleData.code ||
            !newVehicleData.brand ||
            !newVehicleData.name ||
            !newVehicleData.licensePlate ||
            !newVehicleData.image ||
            !newVehicleData.emptyWeight ||
            !newVehicleData.width ||
            !newVehicleData.length ||
            !newVehicleData.maxSpeed ||
            !newVehicleData.odometer
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newVehicle = new Vehicle({
            latitude: newVehicleData.latitude,
            longitude: newVehicleData.longitude,
            heigth: newVehicleData.heigth,
            weight: newVehicleData.weight,
            maxWeight: newVehicleData.maxWeight,
            code: newVehicleData.code,
            brand: newVehicleData.brand,
            name: newVehicleData.name,
            licensePlate: newVehicleData.licensePlate,
            image: newVehicleData.image,
            altitude: newVehicleData.altitude,
            emptyWeight: newVehicleData.emptyWeight,
            width: newVehicleData.width,
            length: newVehicleData.length,
            speed: newVehicleData.speed,
            maxSpeed: newVehicleData.maxSpeed,
            angle: newVehicleData.angle,
            odometer: newVehicleData.odometer,
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
        let newVehicleData = req.body;
        if (
            !newVehicleData.latitude ||
            !newVehicleData.longitude ||
            !newVehicleData.heigth ||
            !newVehicleData.weight ||
            !newVehicleData.maxWeight ||
            !newVehicleData.code ||
            !newVehicleData.brand ||
            !newVehicleData.name ||
            !newVehicleData.licensePlate ||
            !newVehicleData.image ||
            !newVehicleData.altitude ||
            !newVehicleData.emptyWeight ||
            !newVehicleData.width ||
            !newVehicleData.length ||
            !newVehicleData.speed ||
            !newVehicleData.maxSpeed ||
            !newVehicleData.angle ||
            !newVehicleData.odometer ||
            !newVehicleData.status
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
                heigth: newVehicleData.heigth,
                weight: newVehicleData.weight,
                maxWeight: newVehicleData.maxWeight,
                code: newVehicleData.code,
                brand: newVehicleData.brand,
                name: newVehicleData.name,
                licensePlate: newVehicleData.licensePlate,
                image: newVehicleData.image,
                altitude: newVehicleData.altitude,
                emptyWeight: newVehicleData.emptyWeight,
                width: newVehicleData.width,
                length: newVehicleData.length,
                speed: newVehicleData.speed,
                maxSpeed: newVehicleData.maxSpeed,
                angle: newVehicleData.angle,
                odometer: newVehicleData.odometer,
                status: newVehicleData.status
            },
            {
                where: {
                    id: req.params.vehicleId
                },
                raw: true
            }
        );
        let resData = newVehicleData;
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
