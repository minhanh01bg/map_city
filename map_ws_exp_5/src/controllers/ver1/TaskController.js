const { Sequelize } = require('sequelize');
const { Task } = require('../../models/ver1/models');
const Op = Sequelize.Op;

// Create
const addNewTask = async (req, res) => {
    try {
        let newTaskData = req.body;
        if (
            !newTaskData.userId ||
            !newTaskData.vehicleId ||
            !newTaskData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newTask = new Task({
            userId: newTaskData.userId,
            vehicleId: newTaskData.vehicleId,
            areaId: newTaskData.areaId,
            status: newTaskData.status
        });
        let resData = newTask.dataValues;
        await newTask.save();
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
const deleteTaskById = async (req, res) => {
    try {
        let task = await Task.findOne({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        await Task.destroy({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: task
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateTaskById = async (req, res) => {
    try {
        let task = await Task.findOne({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        let newTaskData = req.body;
        if (
            !newTaskData.userId ||
            !newTaskData.vehicleId ||
            !newTaskData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Task.update(
            {
                userId: newTaskData.userId,
                vehicleId: newTaskData.vehicleId,
                areaId: newTaskData.areaId,
                status: newTaskData.status
            },
            {
                where: {
                    id: req.params.taskId
                },
                raw: true
            }
        );
        let resData = await Task.findOne({
            where: {
                id: req.params.taskId
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
const getAllTodayTask = async (req, res) => {
    try {
        let start = new Date();
        start.setUTCHours(0, 0, 0, 0);
        let end = new Date();
        let tasks = await Task.findAll({
            where: {
                createdAt: {
                    [Op.gt]: start,
                    [Op.lt]: end
                }
            },
            raw: true
        });
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: tasks
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllTask = async (req, res) => {
    try {
        let tasks = await Task.findAll({
            raw: true
        });
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: tasks
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getTop10TaskByUserId = async (req, res) => {
    try {
        let tasks = await Task.findAll({
            where: {
                userId: req.params.userId
            },
            limit: 10,
            raw: true
        });
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: tasks
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getTaskById = async (req, res) => {
    try {
        let tasks = await Task.findOne({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: tasks
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewTask,
    deleteTaskById,
    updateTaskById,
    getAllTask,
    getAllTodayTask,
    getTaskById,
    getTop10TaskByUserId
};
