const express = require("express");
const router = express.Router();
const Rsvp = require("./../models/rsvp.model");

router.post("/rsvp/new", (req, res) => {
  console.log(req.body.yelpId);
  console.log(req.body.guestId);
  Rsvp.findOne(
    { yelpId: req.body.yelpId, guestId: req.body.guestId },
    (err, existingRsvp) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (existingRsvp) {
        return res
          .status(409)
          .send({ message: "You have already RSVP'd to this bar." });
      }
      const rsvp = new Rsvp({
        yelpId: req.body.yelpId,
        guestId: req.body.guestId
      });
      rsvp.save(err => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.send(rsvp);
      });
    }
  );
});

module.exports = router;
