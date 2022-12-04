const Joi = require('joi')

const campGroundJoiSechma = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    img: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required()
})

module.exports.campGroundJoiSechma = campGroundJoiSechma