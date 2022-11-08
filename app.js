const express = require('express')
const app = express()
const path = require('path')
const campGround = require('./models/campGround')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('er')
})
db.once('open', () => {
  console.log('su')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.send('hello yelpcamp')
})

app.get('/campground', (req, res) => {
  const myCamp = new campGround({ tittle: 'my camp', description: 'very cheep' })
  myCamp.save()
  res.send(myCamp)
})

app.listen(3000, () => {
  console.log('link ok')
})