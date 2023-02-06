const { ADM_User, ADM_Area, ADM_Task, ADM_Bin, ADM_Vehicle, SUP_Vehicle_Position } = require('../../models/ver1/models');
const bcrypt = require('bcrypt');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewDriver = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newDriverData = req.body;
        newDriverData.role = 'driver';
        newDriverData.image =
            req?.files?.user?.[0]?.filename || 'default_user.png';
        if (
            !newDriverData.phone ||
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName ||
            !newDriverData.gender ||
            !newDriverData.dob
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        console.log(newDriverData);
        let isPhoneExist = await isPhoneExisted(newDriverData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        let newDriver = new ADM_User({
            phone: newDriverData.phone,
            password: encodedPassword,
            email: newDriverData.email,
            firstName: newDriverData.firstName,
            lastName: newDriverData.lastName,
            gender: newDriverData.gender,
            dob: newDriverData.dob,
            image: newDriverData.image,
            description: newDriverData?.description,
            status: 'off',
            role: newDriverData.role
        });
        let resData = newDriver.dataValues;
        await newDriver.save();
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
const deleteDriverById = async (req, res) => {
    try {
        let driver = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await ADM_User.destroy({
            where: {
                id: req.params.userId,
                role: 'driver'
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
const updateDriverById = async (req, res) => {
    try {
        let driver = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await uploadFile(req, res);
        let newDriverData = req.body;
        if (req.files == undefined) {
            newDriverData.image = driver.image;
        } else {
            newDriverData.image = req?.files?.user?.[0]?.filename;
        }
        if (
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName ||
            !newDriverData.gender ||
            !newDriverData.dob
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        await ADM_User.update(
            {
                password: encodedPassword,
                email: newDriverData.email,
                firstName: newDriverData.firstName,
                lastName: newDriverData.lastName,
                gender: newDriverData.gender,
                dob: newDriverData.dob,
                image: newDriverData.image,
                description: newDriverData?.description,
                status: newDriverData?.status
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'driver'
                },
                raw: true
            }
        );
        let resData = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
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
const getAllDriver = async (req, res) => {
    try {
        let drivers = await ADM_User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'driver'
            },
            raw: true
        });
        if (!drivers) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: drivers
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDriverById = async (req, res) => {
    try {
        let driver = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        let task = await ADM_Task.findOne({
            where: {
                driverId: driver.id,
                status: 'on'
            },
            raw: true
        });
        let area = await ADM_Area.findOne({
            where: {
                id: task.areaId
            },
            raw: true
        })
        let bins = await ADM_Bin.findAll({
            where: {
                areaId: task.areaId
            },
            raw: true
        })
        let vehicle = await ADM_Vehicle.findOne({
            where: {
                id: task.vehicleId
            },
            raw: true
        })
        let vehiclePosition = await SUP_Vehicle_Position.findOne({
            where: {
                vehicleId: vehicle.id
            },
            raw: true
        });
        vehicle.latitude = vehiclePosition.latitude;
        vehicle.longitude = vehiclePosition.longitude;
        let resData = {
            ...driver,
            area: area,
            bins: bins,
            vehicle: vehicle
        };
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
// Create
const addNewManager = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newManagerData = req.body;
        newManagerData.role = 'manager';
        newManagerData.image =
            req?.files?.user?.[0]?.filename || 'default_user.png';
        if (
            !newManagerData.phone ||
            !newManagerData.password ||
            !newManagerData.email ||
            !newManagerData.firstName ||
            !newManagerData.lastName ||
            !newManagerData.gender ||
            !newManagerData.dob
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isPhoneExist = await isPhoneExisted(newManagerData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newManagerData.password, salt);
        let newManager = new ADM_User({
            phone: newManagerData.phone,
            password: encodedPassword,
            email: newManagerData.email,
            firstName: newManagerData.firstName,
            lastName: newManagerData.lastName,
            gender: newManagerData.gender,
            dob: newManagerData.dob,
            image: newManagerData.image,
            description: newManagerData?.description,
            status: 'off',
            role: newManagerData.role
        });
        let resData = newManager.dataValues;
        await newManager.save();
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
const deleteManagerById = async (req, res) => {
    try {
        let manager = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'manager'
            },
            raw: true
        });
        if (!manager) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await ADM_User.destroy({
            where: {
                id: req.params.userId,
                role: 'manager'
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
const updateManagerById = async (req, res) => {
    try {
        let manager = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'manager'
            },
            raw: true
        });
        if (!manager) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        await uploadFile(req, res);
        let newManagerData = req.body;
        if (req.files == undefined) {
            newManagerData.image = manager.image;
        } else {
            newManagerData.image = req?.files?.user?.[0]?.filename;
        }
        if (
            !newManagerData.password ||
            !newManagerData.email ||
            !newManagerData.firstName ||
            !newManagerData.lastName ||
            !newManagerData.gender ||
            !newManagerData.dob
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newManagerData.password, salt);
        await ADM_User.update(
            {
                password: encodedPassword,
                email: newManagerData.email,
                firstName: newManagerData.firstName,
                lastName: newManagerData.lastName,
                gender: newManagerData.gender,
                dob: newManagerData.dob,
                description: newManagerData?.description,
                status: newManagerData?.status,
                image: newManagerData.image
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'manager'
                },
                raw: true
            }
        );
        let resData = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'manager'
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
const getAllManager = async (req, res) => {
    try {
        let managers = await ADM_User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'manager'
            },
            raw: true
        });
        if (!managers) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: managers
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getManagerById = async (req, res) => {
    try {
        let manager = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'manager'
            },
            raw: true
        });
        if (!manager) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: manager
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const updateAdminById = async (req, res) => {
    try {
        let admin = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
        });
        if (!admin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Admin not found.'
            });
        }
        await uploadFile(req, res);
        let newAdminData = req.body;
        if (req.files == undefined) {
            newAdminData.image = admin.image;
        } else {
            newAdminData.image = req?.files?.user?.[0]?.filename;
        }
        if (
            !newAdminData.password ||
            !newAdminData.email ||
            !newAdminData.firstName ||
            !newAdminData.lastName ||
            !newAdminData.gender ||
            !newAdminData.dob
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newAdminData.password, salt);
        await ADM_User.update(
            {
                password: encodedPassword,
                email: newAdminData.email,
                firstName: newAdminData.firstName,
                lastName: newAdminData.lastName,
                gender: newAdminData.gender,
                dob: newAdminData.dob,
                description: newAdminData?.description,
                status: newAdminData?.status,
                image: newAdminData.image
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'admin'
                },
                raw: true
            }
        );
        let resData = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'admin'
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
const getAdminById = async (req, res) => {
    try {
        let admin = await ADM_User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
        });
        if (!admin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: admin
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Validate
const isPhoneExisted = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await ADM_User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    phone: phone
                },
                raw: true
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    addNewDriver,
    deleteDriverById,
    updateDriverById,
    getAllDriver,
    getDriverById,
    addNewManager,
    deleteManagerById,
    updateManagerById,
    getAllManager,
    getManagerById,
    updateAdminById,
    getAdminById
};
