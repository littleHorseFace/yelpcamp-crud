const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const { campGroundJoiSechma } = require('./schemas')
const campGround = require('./models/campGround')
const mongoose = require('mongoose')
const errorNewObject = require('./utils/error')
const asyncFun = require('./utils/catchAsync')

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

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const newCampJoi = (req, res, next) => {
  const result = campGroundJoiSechma.validate(req.body)
  console.log(result)
  if (result.error) {
    const errorMessage = result.error.details.map(item => item.message).join(',')
    throw new errorNewObject(errorMessage, 505)
  } else {
    next()
  }
}

// ************以下為路由************


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


app.get('/campground/:id', asyncFun(async (req, res) => {
  const { id } = req.params
  const showCamp = await campGround.findById(id)
  if (!showCamp) throw new errorNewObject('oh invalid id', 450)
  res.render('./campground/show', { showCamp })
}))


app.post('/campground', newCampJoi, asyncFun(async (req, res, next) => {

  const addNewCamp = req.body.campground
  const newCamp = await new campGround(addNewCamp)
  newCamp.save()
  res.redirect('/campground')
}))


app.get('/campground/:id/adit', asyncFun(async (req, res, next) => {
  const { id } = req.params
  const aditCamp = await campGround.findById(id)
  res.render('./campground/adit', { aditCamp })
}
))


app.put('/campground/:id', asyncFun(async (req, res, next) => {
  const { id } = req.params
  const { campground: aditCamp } = req.body
  await campGround.findByIdAndUpdate(id, aditCamp)
  res.redirect(`/campground/${id}`)
}
))


app.delete('/campground/:id', async (req, res) => {
  const { id } = req.params
  await campGround.findByIdAndDelete(id)
  res.redirect('/campground')
})


app.all('*', (req, res, next) => {
  next(new errorNewObject('oh boy roate wrong', 404))
})


app.use((error, req, res, next) => {
  const { status = 500 } = error
  if (!error.message) error.message = "oh no something wrong"
  res.status(status).render('campground/error', { message: error.message, error: error })
})


app.listen(3000, () => {
  console.log('link ok')
})