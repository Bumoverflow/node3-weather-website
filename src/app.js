const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
    res.render('about',{
        name:'Marcin',
        title:'About',
        body:'Told ya!'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        name:'Marcin',
        title:'Help',
        message:'To jest komunikat pomocny na pomocnej stronie'
        })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Marcin'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error:'Wprowadź lokalizacje, dupku'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude,longitude,(error, forecastData)=> {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'Ni mo, wpisz coś'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[],
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        name:'Marcin',
        title:'404'
    })
})

app.get('/help/*', (req,res) => {
    res.send('Help article doesnt exist you moron')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})