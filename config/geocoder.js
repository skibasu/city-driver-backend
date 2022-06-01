const NodeGeocoder = require("node-geocoder")
// TODO ADD GOOGLE MAPS - THIS ONE DOESNT WORK WELL !!!!
const options = {
    provider: process.env.MAP_PROVIDER,

    // Optional depending on the providers

    apiKey: process.env.MAP_KEY,
    formatter: null,
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
