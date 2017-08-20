const express = require('express')
const router = express.Router()

const yelpController = require('../controllers/yelp.controller')

router.get('/:location', (req, res) => {
  yelpController(req.params.location)
    .then(results => {
      if (results) res.json(results)
      else res.status(500).send({ message: 'No results found' })
    })
    .catch(err => {
      console.log(err)
      return res.json(err)
    })
})

module.exports = router
