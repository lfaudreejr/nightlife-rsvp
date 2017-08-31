const express = require('express')
const router = express.Router()

const Rsvp = require('./../models/rsvp.model')
const rsvpController = require('../controllers/rsvp.controller')
const yelpController = require('../controllers/yelp.controller')
const checkJwt = require('../controllers/middleware')

router.post('/rsvp/new', checkJwt, (req, res) => {
  rsvpController
    .findOneRsvp(req.body.yelpId)
    .then(foundRsvp => {
      if (foundRsvp) {
        const isRsvp = foundRsvp.guest.filter(guest => {
          return guest.id.indexOf(req.body.guest.id) !== -1
        })
        if (isRsvp.length > 0) {
          return res.status(409).send({ message: 'User Rsvp already.' })
        } else {
          foundRsvp.guest.push(req.body.guest)
          foundRsvp.save()
          res.send(foundRsvp)
        }
      } else {
        const rsvp = new Rsvp({
          yelpId: req.body.yelpId,
          guest: { id: req.body.guest.id, date: req.body.guest.date }
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
        foundRsvp.guest.map(guest => {
          if (guest.id === req.body.guest.id) {
            console.log(foundRsvp)
            foundRsvp.guest.pop(guest)
          }
        })
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
