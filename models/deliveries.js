const mongoose = require("mongoose")
const getLatLang = require("../utils/getLatLang")
const addressFormatter = require("../utils/addressFormatter")

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
    street: {
        type: String,
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
        required: [true, "Workday id is required"],
    },
})

DeliverySchema.pre("save", async function (next) {
    const res = await getLatLang(`${this.street}, ${this.city}`)
    const { latitude, longitude, zipcode, city, streetName } = res[0]

    this.location = {
        latitude,
        longitude,
        zipcode,
        city,
        streetName,
        roomNumber: this.roomNumber,
        formattedAddress: addressFormatter(streetName, city, zipcode),
    }
    next()
})

module.exports = mongoose.model("Delivery", DeliverySchema)
