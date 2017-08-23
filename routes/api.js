const express = require('express')
const router = express.Router()

const Rsvp = require('./../models/rsvp.model')
const rsvpController = require('../controllers/rsvp.controller')
const yelpController = require('../controllers/yelp.controller')
const checkJwt = require('../controllers/middleware')

router.post('/rsvp/new', checkJwt, (req, res) => {
  console.log(req.body.yelpId)
  console.log(req.body.guestId)
  rsvpController
    .findOneRsvp(req.body.yelpId)
    .then(foundRsvp => {
      if (foundRsvp) {
        const isRsvp = foundRsvp.guestId.filter(id => {
          return id.indexOf(req.body.guestId) !== -1
        })
        console.log('rsvp:', isRsvp)
        if (isRsvp.length > 0) {
          console.log('Already RSVP')
          return res.status(409).send({ message: 'User Rsvp already.' })
        } else {
          foundRsvp.guestId.push(req.body.guestId)
          foundRsvp.save()
          res.send(foundRsvp)
        }
      } else {
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
      }
    })
    .catch(err => {
      return res.status(500).send({ message: 'Server error.' })
    })
})

router.delete('/rsvp/delete', checkJwt, (req, res) => {
  rsvpController
    .findOneRsvp(req.body.yelpId)
    .then(foundRsvp => {
      if (foundRsvp) {
        console.log(foundRsvp)
        foundRsvp.guestId.map(id => {
          if (id === req.body.guestId) {
            // console.log(id)
            foundRsvp.guestId.pop(id)
          }
        })
        console.log(foundRsvp)
        foundRsvp.save(err => {
          if (err) throw err
          res.send(foundRsvp)
        })
      }
    })
    .catch(error => {
      console.error(error)
    })
})

module.exports = router
