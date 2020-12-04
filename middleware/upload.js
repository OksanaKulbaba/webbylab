const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {

        cb(null, 'uploads/')
    },

    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) =>
{
    if (file.mimetype === 'text/plain'){
        cb(null, true)
    }
    else {
       // res.status(500).json({message: "Что то пошло не так!!!!"})
        cb(null, false, new Error('Dont correct file'))
    }
}

module.exports = multer ({
    storage: storage,
    fileFilter: fileFilter
})
