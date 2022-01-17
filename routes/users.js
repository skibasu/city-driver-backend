const express = require("express")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()
const {
    getUsers,
    getUser,
    putUser,
    deleteUser,
    putAvatar,
} = require("../controllers/users")

router.route("/").get(protect, authorize("admin"), getUsers)

router
    .route("/:id")
    .get(protect, authorize("admin"), getUser)
    .put(protect, authorize("user", "admin"), putUser)
    .delete(protect, authorize("user", "admin"), deleteUser)

router.route("/:id/avatar").put(protect, authorize("user", "admin"), putAvatar)
module.exports = router
