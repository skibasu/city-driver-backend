const NodeGeocoder = require("node-geocoder")

const options = {
    provider: process.env.MAP_PROVIDER,

    // Optional depending on the providers

    apiKey: process.env.MAP_KEY,
    formatter: null,
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
