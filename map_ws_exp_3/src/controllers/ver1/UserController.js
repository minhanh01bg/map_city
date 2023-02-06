const { User } = require('../../models/ver1/models');
const bcrypt = require('bcrypt');
const uploadFile = require('../uploadFileMiddleware');

// Create
const addNewDriver = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }

        let newDriverData = req.body;
        newDriverData.role = 'driver';
        newDriverData.image = req.file.filename;
        if (
            !newDriverData.phone ||
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName ||
            !newDriverData.gender ||
            !newDriverData.dob ||
            !newDriverData.image
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        console.log(newDriverData);
        let isEmailExist = await isEmailExisted(newDriverData.email);
        let isPhoneExist = await isPhoneExisted(newDriverData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        let newDriver = new User({
            phone: newDriverData.phone,
            password: encodedPassword,
            email: newDriverData.email,
            firstName: newDriverData.firstName,
            lastName: newDriverData.lastName,
            gender: newDriverData.gender,
            dob: newDriverData.dob,
            image: newDriverData.image,
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
        let driver = await User.findOne({
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
                resMessage: 'User not found.'
            });
        }
        await User.destroy({
            where: {
                id: req.params.userId,
                role: 'driver'
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: driver
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
        let driver = await User.findOne({
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
                resMessage: 'User not found.'
            });
        }
        await uploadFile(req, res);
        let newDriverData = req.body;
        if (req.file == undefined) {
            newDriverData.image = driver.image;
        } else {
            newDriverData.image = req.file.filename;
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
        let isEmailExist = await isEmailExisted(newDriverData.email);
        if (isEmailExist && newDriverData.email !== driver.email) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        await User.update(
            {
                password: encodedPassword,
                email: newDriverData.email,
                firstName: newDriverData.firstName,
                lastName: newDriverData.lastName,
                gender: newDriverData.gender,
                dob: newDriverData.dob,
                image: newDriverData.image
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'driver'
                },
                raw: true
            }
        );
        let resData = newDriverData;
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
        let drivers = await User.findAll({
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
                resMessage: 'User not found.'
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
        let driver = await User.findOne({
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
                resMessage: 'User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: driver
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
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let newManagerData = req.body;
        newManagerData.role = 'manager';
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
        let isEmailExist = await isEmailExisted(newManagerData.email);
        let isPhoneExist = await isPhoneExisted(newManagerData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newManagerData.password, salt);
        let newManager = new User({
            phone: newManagerData.phone,
            password: encodedPassword,
            email: newManagerData.email,
            firstName: newManagerData.firstName,
            lastName: newManagerData.lastName,
            gender: newManagerData.gender,
            dob: newManagerData.dob,
            image: req.file.filename,
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
        let manager = await User.findOne({
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
                resMessage: 'User not found.'
            });
        }
        await User.destroy({
            where: {
                id: req.params.userId,
                role: 'manager'
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: manager
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
        let manager = await User.findOne({
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
                resMessage: 'User not found.'
            });
        }
        await uploadFile(req, res);
        let newManagerData = req.body;
        if (req.file == undefined) {
            newManagerData.image = manager.image;
        } else {
            newManagerData.image = req.file.filename;
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
        let isEmailExist = await isEmailExisted(newManagerData.email);
        if (isEmailExist && newManagerData.email !== manager.email) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newManagerData.password, salt);
        await User.update(
            {
                password: encodedPassword,
                email: newManagerData.email,
                firstName: newManagerData.firstName,
                lastName: newManagerData.lastName,
                gender: newManagerData.gender,
                dob: newManagerData.dob,
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
        let resData = newManagerData;
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
        let managers = await User.findAll({
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
                resMessage: 'User not found.'
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
        let manager = await User.findOne({
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
                resMessage: 'User not found.'
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
const getAdminById = async (req, res) => {
    try {
        let admin = await User.findOne({
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
                resMessage: 'User not found.'
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
            let user = await User.findOne({
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
const isEmailExisted = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    email: email
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
    getAdminById
};
