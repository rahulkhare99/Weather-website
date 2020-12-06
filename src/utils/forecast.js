const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=[ENTER YOUR ACCESS KEY HERE WITHOUT THE SQUARE BRACKETS]&query=' + latitude + ',' + longitude
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
