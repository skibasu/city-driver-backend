const geocoder = require("../config/geocoder")

const getLatLang = async (address) => {
    const res = await geocoder.geocode(address)

    return res
}

module.exports = getLatLang
