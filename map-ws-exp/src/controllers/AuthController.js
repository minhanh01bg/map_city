const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ADM_User, ADM_Task, ADM_Vehicle, ADM_Bin, ADM_Area, SUP_Vehicle_Position } = require('../models/ver1/models');
const uploadFile = require('./uploadFileMiddleware');

const register = async (req, res) => {
    try {
        await uploadFile(req, res);
        let newUserData = req.body;
        newUserData.role = 'admin';
        console.log(req.files);
        newUserData.image = req?.files?.user[0]?.filename || 'default_user.png';
        if (
            !newUserData.phone ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.gender ||
            !newUserData.dob
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isPhoneExist = await isPhoneExisted(newUserData.phone);
        if (isPhoneExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Phone number is already used, please choose another phone number.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        let newUser = new ADM_User({
            phone: newUserData.phone,
            password: encodedPassword,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            gender: newUserData.gender,
            dob: newUserData.dob,
            image: newUserData.image,
            description: newUserData?.description,
            status: 'off',
            role: newUserData.role
        });
        let resData = newUser.dataValues;
        console.log(resData);
        await newUser.save();
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
const login = async (req, res) => {
    try {
        let reqUserData = req.body;
        if (!reqUserData.phone || !reqUserData.password) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let userData = await ADM_User.findOne({
            where: {
                phone: reqUserData.phone
            },
            raw: true
        });
        if (!userData) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'ADM_User not found.'
            });
        }
        let validPassword = await bcrypt.compare(
            reqUserData.password,
            userData.password
        );
        if (!validPassword) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Wrong password.'
            });
        }
        delete userData.password;
        const accessToken = jwt.sign(
            {
                id: userData.id,
                role: userData.role
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '365d'
            }
        );
        let resData = {
            ...userData,
            accessToken: accessToken,
        };
        let task = await ADM_Task.findOne({
            where: {
                driverId: userData.id,
                status: 'on'
            },
            raw: true
        });
        if (task) {
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
            if (vehicle) {
                let vehiclePosition = await SUP_Vehicle_Position.findOne({
                    where: {
                        vehicleId: vehicle.id
                    },
                    raw: true
                });
                vehicle.latitude = vehiclePosition.latitude;
                vehicle.longitude = vehiclePosition.longitude;
            }
            resData.area = area;
            resData.bins = bins;
            resData.vehicle = vehicle;
        }
        
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
    register,
    login
};
