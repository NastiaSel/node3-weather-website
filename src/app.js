const path = require('path')
//Basic express server
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname) // path of directory where my script lives in
// console.log(__filename) // path of file
// console.log(path.join(__dirname, '../public'))

//the express app
const app = express()
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //this is a path for folder hbs uses, if were not using the default directory 'views'
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')//get handlebars set up
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//set up a route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', //for dynamic html creation
        name: 'Nastya Sel'
    }) //which handlebars we want to use
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nastya Sel'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Nastya Sel'
    })
})
//app.com
//app.com/help
//app.com/about

//configures what to do when someone tries to get to resource url

//url, request, response
// app.get('', (req, res) => {
//     //send something back to the requestor
//     res.send('<h1>Weather</h1>') //send html
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Andrew',
//             age: 27
//         },
//         {
//             name: 'Sarah'
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send(
                {
                    forecast: forecastData,
                    location,
                    address: req.query.address
                }
            )
            // console.log(location);
            // console.log(forecastData);
        })
    })




    // res.send(
    //     {
    //         forecast: 'it is snowing',
    //         location: 'philadelphia',
    //         address: req.query.address
    //     }
    // )
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Nastya Sel',
        title: '404',
        errorMessage: 'Help article not found'
    })
    //res.send('Help article not found')
})

//for 404 errors - everything that doesnt matches all of above.
//needs to be at the end
app.get('*', (req, res) => {
    res.render('404', {
        name: 'Nastya Sel',
        title: '404',
        errorMessage: 'Page not found'
    })
})
//starts up the server & has it listen on a specific port
app.listen(3000, () => {
    //this function runs when the server is up and running
    console.log('Server is up on port 3000')
})