const util = require('util');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'bin') {
            cb(null, './uploads/bin');
        } else if (file.fieldname === 'user') {
            cb(null, './uploads/user');
        } else if (file.fieldname === 'vehicle') {
            cb(null, './uploads/vehicle');
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'bin') {
            cb(null, 'bin_' + Date.now() + path.extname(file.originalname));
        } else if (file.fieldname === 'user') {
            cb(null, 'user_' + Date.now() + path.extname(file.originalname));
        } else if (file.fieldname === 'vehicle') {
            cb(null, 'vehicle_' + Date.now() + path.extname(file.originalname));
        }
    }
});

let uploadFile = multer({
    storage: storage
}).fields([
    { name: 'bin', maxCount: 1 },
    { name: 'user', maxCount: 1 },
    { name: 'vehicle', maxCount: 1 }
]);

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
