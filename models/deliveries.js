const mongoose = require("mongoose")
const CONFIG = require("../config/config")
const getLatLang = require("../utils/getLatLang")

const DeliverySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["cash", "online", "card", "free"],
        required: [true, "type of paiment is required!"],
    },
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
    country: {
        type: String,
        default: "Poland",
        required: [true, "Country is required"],
        maxlength: [100, "Maximum length is 100"],
        minLength: [2, "Minimum length is  2"],
    },
    street: {
        type: String,
        required: [true, "Street is required"],
        maxlength: [100, "Maximum length is 100"],
        minLength: [2, "Minimum length is  2"],
    },
    roomNumber: {
        type: Number,
        maxlength: [15, "Maximum length is  15"],
    },
    city: {
        type: String,
        default: "Wrocław",
        required: [true, "City is required"],
        maxlength: [50, "Maximum length is  50"],
        minLength: [2, "Minimum length is 2"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        minLength: [1, "Minimum length is 1"],
    },
    petrol: {
        type: Number,
    },
    note: {
        type: String,
        maxlength: [350, "Maximum length is  350"],
    },
    location: {
        latitude: Number,
        longitude: Number,
        street: String,
        roomNumber: Number,
        city: String,
        zipcode: String,
        formattedAddress: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    workDay: {
        type: mongoose.Schema.ObjectId,
        ref: "WorkDay",
        required: [true, "WorkDay id is required"],
    },
})

DeliverySchema.pre("save", async function (next) {
    this.location = await getLatLang(`${this.street} ${this.city}`)
    next()
})

DeliverySchema.pre("findOneAndUpdate", async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery())
    const update = this.getUpdate()

    const street = update.street || docToUpdate.street
    const city = update.city || docToUpdate.city

    update.location = await getLatLang(`${street} ${city}`)

    this.setUpdate(update)
    next()
})
exports.deliverSchema = () => DeliverySchema
module.exports = mongoose.model("Delivery", DeliverySchema)
