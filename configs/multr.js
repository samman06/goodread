let multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, {mimetype}, cb) => {
    if (mimetype === 'image/jpeg' || mimetype === 'image/png') {
        console.log(1);
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits: {fileSize: 1024 * 1024 * 5},
});

module.exports = upload;
