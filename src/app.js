const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicdirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicdirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rahul khare'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Rahul khare'
    })
})

 
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        content: 'Contact rahulrajkhare@gmail.com if you are facing issues with this website.',
        name: 'Rahul khare'
    })
})

 app.get('/weather', ( req, res ) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return (res.send({ error }))
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', ( req, res ) => {
    res.render('404', {
        title: 'Error',
        errormessage: 'Help article not found',
        name: 'Rahul khare'
    })
})

app.get('*', ( req, res ) => {
    res.render('404', {
        title: 'Error',
        errormessage: 'Page not found',
        name: 'Rahul khare'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})