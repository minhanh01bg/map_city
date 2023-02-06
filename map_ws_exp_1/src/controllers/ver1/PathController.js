const { Path } = require('../../models/index');
const bcrypt = require('bcrypt');

// Create
const addNewPath = async (req, res) => {
    try {
        let newPathData = req.body;
        if (
            !newPathData.start ||
            !newPathData.end ||
            !newPathData.description
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newPath = new Path({
            start: newPathData.start,
            end: newPathData.end,
            description: newPathData.description,
            status: newPathData.status
        });
        let resData = newPath.dataValues;
        await newPath.save();
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
const deletePathById = async (req, res) => {
    try {
        let path = await Path.findOne({
            where: {
                id: req.params.pathId
            },
            raw: true
        });
        if (!path) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Path not found.'
            });
        }
        await Path.destroy({
            where: {
                id: req.params.pathId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: path
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updatePathById = async (req, res) => {
    try {
        let path = await Path.findOne({
            where: {
                id: req.params.pathId
            },
            raw: true
        });
        if (!path) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Path not found.'
            });
        }
        let newPathData = req.body;
        if (
            !newPathData.start ||
            !newPathData.end ||
            !newPathData.description
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Path.update(
            {
                start: newPathData.start,
                end: newPathData.end,
                description: newPathData.description,
                status: newPathData.status
            },
            {
                where: {
                    id: req.params.pathId
                },
                raw: true
            }
        );
        let resData = newPathData;
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
const getAllPath = async (req, res) => {
    try {
        let paths = await Path.findAll({
            raw: true
        });
        if (!paths) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Path not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: paths
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getPathById = async (req, res) => {
    try {
        let paths = await Path.findOne({
            where: {
                id: req.params.pathId
            },
            raw: true
        });
        if (!paths) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Path not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: paths
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewPath,
    deletePathById,
    updatePathById,
    getAllPath,
    getPathById
};
