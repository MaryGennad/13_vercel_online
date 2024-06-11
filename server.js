const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

const mongoose = require('mongoose'); //подключение
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);

const Cat = mongoose.model('Cat', { name: String });









app.use('/', express.static('public'));


app.get('/api/weather', (req, res) => { //запись


    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));

    res.json({
        'temperature': 30
    })
})

app.get('/api/log', async (req, res) => { //чтение
   let cats = await Cat.find()
    res.json(cats)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})