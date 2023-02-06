const { User } = require('../../models/index');
const bcrypt = require('bcrypt');

// Create
const addNewDriver = async (req, res) => {
    try {
        let newDriverData = req.body;
        if (
            !newDriverData.username ||
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newDriverData.email);
        let isDrivernameExist = await isDrivernameExisted(
            newDriverData.username
        );
        if (isDrivernameExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Drivername already existed, please choose another name.'
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
            role: newDriverData.role,
            username: newDriverData.username,
            password: encodedPassword,
            email: newDriverData.email,
            firstName: newDriverData.firstName,
            lastName: newDriverData.lastName
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
                id: req.params.driverId
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
                id: req.params.driverId,
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
                id: req.params.driverId
            },
            raw: true
        });
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        let newDriverData = req.body;
        if (
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName
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
                email: newDriverData.email,
                password: encodedPassword,
                firstName: newDriverData.firstName,
                lastName: newDriverData.lastName
            },
            {
                where: {
                    id: req.params.driverId
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
        let drivers = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.driverId
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
// Validate
const isDrivernameExisted = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let driver = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    username: username
                },
                raw: true
            });
            if (driver) {
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
            let driver = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    email: email
                },
                raw: true
            });
            if (driver) {
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
    getDriverById
};
