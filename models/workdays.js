const mongoose = require("mongoose")

const WorkDay = new mongoose.Schema({
    finishedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isFinish: {
        type: Boolean,
        default: false,
    },
    modifyAt: {
        type: Array,
        default: [],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    deliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }],
})

module.exports = mongoose.model("WorkDay", WorkDay)
