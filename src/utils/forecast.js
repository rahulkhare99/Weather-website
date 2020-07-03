const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c0ee2cb890d133b3cacf78bcfea7fe8e&query=' + latitude + ',' + longitude
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to get forecast services', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, (
                ' It is currently ' + body.current.temperature + ' degrees out. Though it actually feels like ' + body.current.feelslike + ' degrees out.' + ' The precipitation percentage is ' + body.current.precip + '%, and the cloud cover is ' + body.current.cloudcover + '%.'
            ))
        }
    })
}

module.exports = forecast