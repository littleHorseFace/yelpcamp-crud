const mongoose = require('mongoose')
const schema = mongoose.Schema

const yelpCamp = new schema({
  tittle : String,
  price: String,
  location: String,
  description: String
})

module.exports = mongoose.model('campGround', yelpCamp)