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
  .then(address => {
    res.json({address: address.dataValues})
  })
  .catch(err => {
    console.log(err)
    res.status(422).json({error: err})
  })
}

exports.show = (req, res, next) => {
  Address.findByPk(req.params.id)
  .then(address => {
    res.json({address: address})
  })
  .catch(err => {
    console.log(err)
    res.status(422).json({error: err})
  })
}

exports.update = (req, res, next) => {
  const newAddress = req.body
  Address.findByPk(req.params.id)
  .then(address => {
    address.country = newAddress.country
    address.state = newAddress.state
    address.city = newAddress.city
    address.street = newAddress.street
    address.neighborhood = newAddress.neighborhood
    address.number = newAddress.number
    return address.save()
  })
  .then(response => {
    res.json({address: response.dataValues})
  })
  .catch(err => {
    console.log(err)
    res.status(422).json({error: err})
  })
}