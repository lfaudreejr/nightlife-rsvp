const express = require('express')
const router = express.Router()
const Rsvp = require('./../models/rsvp.model')
const rsvpController = require('../controllers/rsvp.controller')

router.post('/rsvp/new', (req, res) => {
  console.log(req.body.yelpId)
  console.log(req.body.guestId)
  rsvpController(req.body.yelpId, req.body.guestId)
    .then(foundRsvp => {
      if (foundRsvp) {
        return res
          .status(409)
          .send({ message: "You have already RSVP'd to this bar." })
      }
      const rsvp = new Rsvp({
        yelpId: req.body.yelpId,
        guestId: req.body.guestId
      })
      rsvp.save(err => {
        if (err) {
          throw err
        }
        res.send(rsvp)
      })
    })
    .catch(err => {
      return res.status(500).send({ message: 'Server error.' })
    })
})

module.exports = router
