const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
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

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  res.send('hello yelpcamp')
})

app.get('/campground', async (req, res) => {
  const campgrounds = await campGround.find({})
  res.render('./campground/index', { campgrounds })
})

app.get('/campground/new', (req, res) => {
  res.render('./campground/new')
}
)
app.get('/campground/:id', async (req, res) => {
  const { id } = req.params
  const showCamp = await campGround.findById(id)
  res.render('./campground/show', { showCamp })
})

app.post('/campground', async (req, res) => {
  const addNewCamp = req.body.campground
  const newCamp = await new campGround(addNewCamp)
  console.log(newCamp)
  newCamp.save()
  res.redirect('/campground')
})

app.get('/campground/:id/adit', async (req, res) => {
  const { id } = req.params
  const aditCamp = await campGround.findById(id)
  res.render('./campground/adit', { aditCamp })
})

app.put('/campground/:id', async (req, res) => {
  const { id } = req.params
  const { campground: aditCamp } = req.body
  console.log(aditCamp)
  await campGround.findByIdAndUpdate(id, aditCamp)
  res.redirect('/campground')
})

app.delete('/campground/:id', async (req, res) => {
  const { id } = req.params
  await campGround.findByIdAndDelete(id)
  res.redirect('/campground')
})

app.listen(3000, () => {
  console.log('link ok')
})