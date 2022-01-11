const express = require("express")
const router = express.Router()
const {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
} = require("../controllers/users")

router.route("/").get(getUsers).post(postUser)

router.route("/:id").get(getUser).put(putUser).delete(deleteUser)

module.exports = router
