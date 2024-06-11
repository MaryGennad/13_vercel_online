const express = require('express')
const API_KEY = 'a2906b093bfe0cb70f7c5e3e7b3baeb7'
const fetch = require('node-fetch')
const app = express()
const port = 3000

require('dotenv').config()

const mongoose = require('mongoose'); //подключение
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);

const Weather = mongoose.model('Weather', {
    temperature: String,
    city: String,
    date: String,
});

// const Cat = mongoose.model('Cat', { name: String });
app.use('/', express.static('public'));
// app.get('/api/weather', (req, res) => { //запись

//     const kitty = new Cat({ name: 'Zildjian' });
//     kitty.save().then(() => console.log('meow'));

//     res.json({
//         'temperature': 30
//     })
// })
// app.get('/api/log', async (req, res) => { //чтение
//    let cats = await Cat.find()
//     res.json(cats)
// })

app.get('/api/weather', async (req, res) => {

    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.currCity}&appid=${API_KEY}&units=${req.query.units}`)
    let dataJson = await data.json()
    
    let temperature = dataJson.main.temp
    const newWeather = new Weather()
    newWeather.temperature = temperature,
    newWeather.city = dataJson.name,
    newWeather.date = new Date()
    await newWeather.save() //запись
    
    res(dataJson)
 })
app.get('/api/log', async (req, res) => {
    let log = await Weather.find() 
    res.send(log) //чтение
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})