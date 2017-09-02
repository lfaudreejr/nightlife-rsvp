const express = require('express')
const router = express.Router()

const yelpController = require('../controllers/yelp.controller')

router.get('/:location', (req, res) => {
  const yelpBars = yelpController.findBars(req.params.location)
  yelpBars
    .then(bars => {
      res.json(bars)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

module.exports = router
