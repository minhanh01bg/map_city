const util = require('util');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        // console.log(file.originalname);
        cb(null, 'image_' + Date.now() + path.extname(file.originalname));
    }
});

let uploadFile = multer({
    storage: storage
}).single('image');

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
