const path = require("path")
const multer = require("multer")

const maxSize = 1 * 1000 * 1000

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/uploads")
    },
    filename: function (req, file, callback) {
        callback(null, `avatar_${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.includes("image")) {
            return cb(null, false, new Error("I don't have a clue!"))
        }
        cb(null, true)
    },
}).single("bestand")

module.exports = upload
