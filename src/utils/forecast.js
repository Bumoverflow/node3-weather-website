const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=e287a832b42961c29e658b5bed752662&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `Jutro ma być ${body.forecast[Object.keys(body.forecast)[0]].avgtemp} stopni Celsjusza. Maksymalna jutrzejsza temperatura to ${body.forecast[Object.keys(body.forecast)[0]].maxtemp} stopni Celsjusza`)
        }
    
    })
}

module.exports = forecast