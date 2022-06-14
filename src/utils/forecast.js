const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=54370691c0c21d91641b88d0cc38d8ec&query=' + lat + ',' + long

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            //low level error
            callback('Unable to connect to location services', undefined)
        }

        else if (body.error) {
            //coordinate error
            callback('Unable to find forecast. Try another search', undefined)
        }
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                wind_speed: body.current.wind_speed
            })
            console.log(body.current.wind_speed)

        }
    })
}
module.exports = forecast