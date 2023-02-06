const { Bin } = require('../../models/index');
const bcrypt = require('bcrypt');

// Create
const addNewBin = async (req, res) => {
    try {
        let newBinData = req.body;
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.heigth ||
            !newBinData.weight ||
            !newBinData.maxWeight ||
            !newBinData.pathId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newBin = new Bin({
            latitude: newBinData.latitude,
            longitude: newBinData.longitude,
            heigth: newBinData.heigth,
            weight: newBinData.weight,
            maxWeight: newBinData.maxWeight,
            status: newBinData.status,
            pathId: newBinData.pathId
        });
        let resData = newBin.dataValues;
        await newBin.save();
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
        let newBinData = req.body;
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.heigth ||
            !newBinData.weight ||
            !newBinData.maxWeight ||
            !newBinData.status ||
            !newBinData.pathId
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
                heigth: newBinData.heigth,
                weight: newBinData.weight,
                maxWeight: newBinData.maxWeight,
                status: newBinData.status,
                pathId: newBinData.pathId
            },
            {
                where: {
                    id: req.params.binId
                },
                raw: true
            }
        );
        let resData = newBinData;
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
        let bins = await Bin.findOne({
            where: {
                id: req.params.binId
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
    getBinById
};