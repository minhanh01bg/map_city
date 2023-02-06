const { ADM_Area, ADM_Bin } = require('../../models/ver1/models');
// Create
const addNewArea = async (req, res) => {
    try {
        let newAreaData = req.body;
        let newArea = new ADM_Area({
            acreage: newAreaData.acreage,
            description: newAreaData.description,
            status: newAreaData.status
        });
        let resData = newArea.dataValues;
        await newArea.save();
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
const deleteAreaById = async (req, res) => {
    try {
        let area = await ADM_Area.findOne({
            where: {
                id: req.params.areaId
            },
            raw: true
        });
        if (!area) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Area not found.'
            });
        }
        await ADM_Area.destroy({
            where: {
                id: req.params.areaId
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
const updateAreaById = async (req, res) => {
    try {
        let area = await ADM_Area.findOne({
            where: {
                id: req.params.areaId
            },
            raw: true
        });
        if (!area) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Area not found.'
            });
        }
        let newAreaData = req.body;
        await ADM_Area.update(
            {
                acreage: newAreaData.acreage,
                description: newAreaData.description,
                status: newAreaData.status
            },
            {
                where: {
                    id: req.params.areaId
                },
                raw: true
            }
        );
        let resData = await ADM_Area.findOne({
            where: {
                id: req.params.areaId
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
const getAllArea = async (req, res) => {
    try {
        let areas = await ADM_Area.findAll({
            raw: true
        });
        if (!areas) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Area not found.'
            });
        }
        for (let i = 0; i < areas.length; i++) {
            areas[i].bins = await ADM_Bin.findAll({
                where: {
                    areaId: areas[i].id
                },
                raw: true
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: areas
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAreaById = async (req, res) => {
    try {
        let area = await ADM_Area.findOne({
            where: {
                id: req.params.areaId
            },
            raw: true
        });
        if (!area) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Area not found.'
            });
        }
        area.bins = await ADM_Bin.findAll({
            where: {
                areaId: area.id
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: area
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewArea,
    deleteAreaById,
    updateAreaById,
    getAllArea,
    getAreaById
};
