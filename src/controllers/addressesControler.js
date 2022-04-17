const Address = require('../models/address')

exports.index = (req, res, next) => {
  Address.findAll()
  .then(addresses => {
    res.json({ addresses: addresses });
  })
  .catch(err => console.log(err))
}

exports.create = (req, res, next) => {
  const address = req.body
  Address.create({
    country: address.country,
    state: address.state,
    city: address.city,
    street: address.street,
    neighborhood: address.neighborhood,
    number: address.number
  })
  .then(result => {
    console.log("Created Address")
    res.json({deu: "bom"})
  })
  .catch(err => {
    console.log(err)
    res.status(422).json({error: err})
  })
  
  console.log(req.body)
}