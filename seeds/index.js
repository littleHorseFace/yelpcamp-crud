const mongoose = require('mongoose')
const campGround = require('../models/campGround')
const cities = require('./cities')
const seedsHelper = require('./helpSeeds')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', () => {
  console.log('this seeds is error')
})
db.once('open', () => {
  console.log('this seeds is ok!!')
})

tittleFun = array => array[Math.floor(Math.random() * array.length)]

const seedAsync = async () => {
  campGround.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const oneThousandsRandom = Math.floor(Math.random() * 1000)
    const city = new campGround({
      location: `${cities[oneThousandsRandom].city} - ${cities[oneThousandsRandom].state} `,
      tittle: `${tittleFun(seedsHelper.descriptors)} - ${tittleFun(seedsHelper.places)}`
    })
    await city.save()
  }
}

seedAsync()
  .then(() => {
    mongoose.connection.close()
    console.log('this seeds is closing')
  })