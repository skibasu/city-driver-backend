const geocoder = require("../config/geocoder")
const addressFormatter = require("./addressFormatter")

const getLatLang = async (address) => {
    const res = await geocoder.geocode(address)
    const { latitude, longitude, zipcode, city, streetName } = res[0]

    return {
        latitude,
        longitude,
        zipcode,
        city,
        streetName,
        roomNumber: this.roomNumber,
        formattedAddress: addressFormatter(streetName, city, zipcode),
    }
}

module.exports = getLatLang
