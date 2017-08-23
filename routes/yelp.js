const express = require('express')
const router = express.Router()

const yelpController = require('../controllers/yelp.controller')

router.get('/:location', (req, res) => {
  const yelpBars = yelpController.findBars(req.params.location)
  yelpBars
    .then(bars => {
      res.json(bars)
      // console.log('GOT DEM BARS TO DATE', bars)
    })
    .catch(err => {
      console.error(err)
      throw err
    })
})

module.exports = router
