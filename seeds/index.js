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
  await campGround.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const oneThousandsRandom = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const city = new campGround({
      location: `${cities[oneThousandsRandom].city} - ${cities[oneThousandsRandom].state} `,
      tittle: `${tittleFun(seedsHelper.descriptors)} - ${tittleFun(seedsHelper.places)}`,
      img: `https://storage.googleapis.com/www-cw-com-tw/article/201912/article-5de7677292c26.jpg`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eligendi corporis cumque eum, repudiandae quas dicta architecto reiciendis, ab illum officiis, voluptates ut voluptatibus? Impedit magni non eligendi illo voluptates?',
      price
    })
    await city.save()
  }
}

seedAsync()
  .then(() => {
    mongoose.connection.close()
    console.log('this seeds is closing')
  })

// https://source.unsplash.com/collection/483251