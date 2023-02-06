const { Bin, Task } = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewBin = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let newBinData = req.body;
        newBinData.image = req.file.filename;
        console.log(newBinData);
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.address ||
            !newBinData.heigth ||
            !newBinData.weight ||
            !newBinData.maxWeight ||
            !newBinData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newBin = new Bin({
            latitude: newBinData.latitude,
            longitude: newBinData.longitude,
            address: newBinData.address,
            heigth: newBinData.heigth,
            weight: newBinData.weight,
            maxWeight: newBinData.maxWeight,
            image: newBinData.image,
            status: newBinData.status,
            areaId: newBinData.areaId
        });
        let resData = newBin.dataValues;
        await newBin.save();
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
const deleteBinById = async (req, res) => {
    try {
        let bin = await Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        await Bin.destroy({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bin
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateBinById = async (req, res) => {
    try {
        let bin = await Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        await uploadFile(req, res);
        let newBinData = req.body;
        if (req.file == undefined) {
            newBinData.image = bin.image;
        } else {
            newBinData.image = req.file.filename;
        }
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.address ||
            !newBinData.heigth ||
            !newBinData.weight ||
            !newBinData.maxWeight ||
            !newBinData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Bin.update(
            {
                latitude: newBinData.latitude,
                longitude: newBinData.longitude,
                address: newBinData.address,
                heigth: newBinData.heigth,
                weight: newBinData.weight,
                maxWeight: newBinData.maxWeight,
                image: newBinData.image,
                status: newBinData.status,
                areaId: newBinData.areaId
            },
            {
                where: {
                    id: req.params.binId
                },
                raw: true
            }
        );
        let resData = await Bin.findOne({
            where: {
                id: req.params.binId
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
const getAllBin = async (req, res) => {
    try {
        let bins = await Bin.findAll({
            raw: true
        });
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bins
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getBinById = async (req, res) => {
    try {
        let bin = await Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bin
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllBinByAreaId = async (req, res) => {
    try {
        let bins = await Bin.findAll({
            where: {
                areaId: req.params.areaId
            },
            raw: true
        });
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bins
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllBinByVehicleId = async (req, res) => {
    try {
        let area = await Task.findOne({
            where: {
                vehicleId: req.params.vehicleId
            },
            raw: true
        });
        console.log(area);
        let bins = await Bin.findAll({
            where: {
                areaId: area.id
            },
            raw: true
        });
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bins
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewBin,
    deleteBinById,
    updateBinById,
    getAllBin,
    getBinById,
    getAllBinByAreaId,
    getAllBinByVehicleId
};
