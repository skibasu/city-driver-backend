const express = require("express")
const router = express.Router()
const {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    putAvatar,
} = require("../controllers/users")

router.route("/").get(getUsers).post(postUser)

router.route("/:id").get(getUser).put(putUser).delete(deleteUser)

router.route("/:id/avatar").put(putAvatar)
module.exports = router
