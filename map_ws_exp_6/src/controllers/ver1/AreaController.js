const { Area } = require('../../models/ver1/models');
// Create
const addNewArea = async (req, res) => {
    try {
        let newAreaData = req.body;
        if (!newAreaData.description) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newArea = new Area({
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
        let area = await Area.findOne({
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
        await Area.destroy({
            where: {
                id: req.params.areaId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: area
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
        let area = await Area.findOne({
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
        if (!newAreaData.description) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Area.update(
            {
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
        let resData = await Area.findOne({
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
        let areas = await Area.findAll({
            raw: true
        });
        if (!areas) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Area not found.'
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
        let areas = await Area.findOne({
            where: {
                id: req.params.areaId
            },
            raw: true
        });
        if (!areas) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Area not found.'
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

module.exports = {
    addNewArea,
    deleteAreaById,
    updateAreaById,
    getAllArea,
    getAreaById
};
