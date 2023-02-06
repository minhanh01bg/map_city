const { Sequelize } = require('sequelize');
const {
    ADM_Task,
    ADM_User,
    ADM_Vehicle,
    ADM_Area
} = require('../../models/ver1/models');
const Op = Sequelize.Op;

// Create
const addNewTask = async (req, res) => {
    try {
        let newTaskData = req.body;
        if (
            !newTaskData.driverId ||
            !newTaskData.vehicleId ||
            !newTaskData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newTask = new ADM_Task({
            driverId: newTaskData.driverId,
            vehicleId: newTaskData.vehicleId,
            areaId: newTaskData.areaId,
            description: newTaskData?.description,
            status: newTaskData?.status
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
        let task = await ADM_Task.findOne({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Task not found.'
            });
        }
        await ADM_Task.destroy({
            where: {
                id: req.params.taskId
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
const updateTaskById = async (req, res) => {
    try {
        let task = await ADM_Task.findOne({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Task not found.'
            });
        }
        let newTaskData = req.body;
        if (
            !newTaskData.driverId ||
            !newTaskData.vehicleId ||
            !newTaskData.areaId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await ADM_Task.update(
            {
                driverId: newTaskData.driverId,
                vehicleId: newTaskData.vehicleId,
                areaId: newTaskData.areaId,
                description: newTaskData.description,
                status: newTaskData.status
            },
            {
                where: {
                    id: req.params.taskId
                },
                raw: true
            }
        );
        let resData = await ADM_Task.findOne({
            where: {
                id: req.params.taskId
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
const getAllTodayTask = async (req, res) => {
    try {
        let start = new Date();
        start.setUTCHours(0, 0, 0, 0);
        let end = new Date();
        let tasks = await ADM_Task.findAll({
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
                resMessage: 'ADM_Task not found.'
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
        let tasks = await ADM_Task.findAll({
            raw: true
        });
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Task not found.'
            });
        }
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].driver = await ADM_User.findOne({
                where: {
                    id: tasks[i].driverId
                },
                raw: true
            });
            tasks[i].vehicle = await ADM_Vehicle.findOne({
                where: {
                    id: tasks[i].vehicleId
                },
                raw: true
            });
            tasks[i].area = await ADM_Area.findOne({
                where: {
                    id: tasks[i].areaId
                },
                raw: true
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
        let tasks = await ADM_Task.findAll({
            where: {
                driverId: req.params.driverId
            },
            limit: 10,
            raw: true
        });
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Task not found.'
            });
        }
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].vehicle = await ADM_Vehicle.findOne({
                where: {
                    id: tasks[i].vehicleId
                },
                raw: true
            });
            tasks[i].area = await ADM_Area.findOne({
                where: {
                    id: tasks[i].areaId
                },
                raw: true
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
        let task = await ADM_Task.findOne({
            where: {
                id: req.params.taskId
            },
            raw: true
        });
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_Task not found.'
            });
        }
        task.driver = await ADM_User.findOne({
            where: {
                id: task.driverId
            },
            raw: true
        });
        task.vehicle = await ADM_Vehicle.findOne({
            where: {
                id: task.vehicleId
            },
            raw: true
        });
        task.area = await ADM_Area.findOne({
            where: {
                id: task.areaId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: task
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
