const { ADM_Bin, ADM_Area } = require('../../models/ver1/models');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewBin = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newBinData = req.body;
        newBinData.image = req?.files?.bin?.[0]?.filename || 'default_bin.png';
        console.log(newBinData);
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.address ||
            !newBinData.height ||
            !newBinData.length ||
            !newBinData.width ||
            !newBinData.maxWeight ||
            !newBinData.color ||
            !newBinData.material ||
            !newBinData.brand ||
            !newBinData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newBin = new ADM_Bin({
            latitude: newBinData.latitude,
            longitude: newBinData.longitude,
            address: newBinData.address,
            height: newBinData.height,
            length: newBinData.length,
            width: newBinData.width,
            maxWeight: newBinData.maxWeight,
            color: newBinData.color,
            material: newBinData.material,
            brand: newBinData.brand,
            image: newBinData.image,
            description: newBinData.description,
            status: 'empty',
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
        let bin = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        await ADM_Bin.destroy({
            where: {
                id: req.params.binId
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
const updateBinById = async (req, res) => {
    try {
        let bin = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        await uploadFile(req, res);
        let newBinData = req.body;
        if (req.files == undefined) {
            newBinData.image = bin.image;
        } else {
            newBinData.image = req?.files?.bin?.[0]?.filename;
        }
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.address ||
            !newBinData.height ||
            !newBinData.length ||
            !newBinData.width ||
            !newBinData.maxWeight ||
            !newBinData.color ||
            !newBinData.material ||
            !newBinData.brand ||
            !newBinData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await ADM_Bin.update(
            {
                latitude: newBinData.latitude,
                longitude: newBinData.longitude,
                address: newBinData.address,
                height: newBinData.height,
                length: newBinData.length,
                width: newBinData.width,
                maxWeight: newBinData.maxWeight,
                color: newBinData.color,
                material: newBinData.material,
                brand: newBinData.brand,
                image: newBinData.image,
                description: newBinData.description,
                status: 'empty',
                areaId: newBinData.areaId
            },
            {
                where: {
                    id: req.params.binId
                },
                raw: true
            }
        );
        let resData = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
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
const getAllBin = async (req, res) => {
    try {
        let bins = await ADM_Bin.findAll({
            raw: true
        });
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        for (let i = 0; i < bins.length; i++) {
            bins[i].area = await ADM_Area.findOne({
                where: {
                    id: bins[i].areaId
                },
                raw: true
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
        let bin = await ADM_Bin.findOne({
            where: {
                id: req.params.binId
            },
            raw: true
        });
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Bin not found.'
            });
        }
        bin.area = await ADM_Area.findOne({
            where: {
                id: bin.areaId
            },
            raw: true
        });
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

module.exports = {
    addNewBin,
    deleteBinById,
    updateBinById,
    getAllBin,
    getBinById
};
