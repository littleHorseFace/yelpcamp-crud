const mongoose = require('mongoose')
const schema = mongoose.Schema

const yelpCamp = new schema({
  tittle : String,
  price: Number,
  img: String,
  location: String,
  description: String
})

module.exports = mongoose.model('campGround', yelpCamp)