const express = require("express")
const { protect } = require("../middleware/auth")

const router = express.Router()
const {
    getUsers,
    getUser,
    putUser,
    deleteUser,
    putAvatar,
} = require("../controllers/users")

router.route("/").get(protect, getUsers)

router
    .route("/:id")
    .get(protect, getUser)
    .put(protect, putUser)
    .delete(protect, deleteUser)

router.route("/:id/avatar").put(protect, putAvatar)
module.exports = router
