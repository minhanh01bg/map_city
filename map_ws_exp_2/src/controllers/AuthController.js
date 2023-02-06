const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/ver1/models');
const uploadFile = require('./uploadFileMiddleware');

const register = async (req, res) => {
    try {
        await uploadFile(req, res);
        // console.log(123);
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let newDriverData = req.body;
        newDriverData.role = 'admin';
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
            image: req.file.filename,
            role: newDriverData.role
        });
        let resData = newDriver.dataValues;
        console.log(resData);
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
const login = async (req, res) => {
    try {
        let reqUserData = req.body;
        if (!reqUserData.phone || !reqUserData.password) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let userData = await User.findOne({
            where: {
                phone: reqUserData.phone
            },
            raw: true
        });
        if (!userData) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
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
        let resData = userData;
        delete resData.password;
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
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: {
                ...resData,
                accessToken: accessToken
            }
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
    register,
    login
};
