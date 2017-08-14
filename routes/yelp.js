const express = require("express");
const router = express.Router();

const yelp = require("yelp-fusion");

router.get("/:location", (req, res) => {
  const clientId = process.env.YELP_ID;
  const clientSecret = process.env.YELP_SECRET;
  const location = req.params.location;
  const searchRequest = {
    term: "bars",
    location: req.params.location
  };
  yelp
    .accessToken(clientId, clientSecret)
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search(searchRequest).then(response => {
        const firstTenResults = response.jsonBody.businesses.slice(0, 20);
        // const prettyJson = JSON.stringify(firstTenResults, null, 4);
        return res.json(firstTenResults);
      });
    })
    .catch(e => {
      console.log(e);
      return res.json(e);
    });
});

module.exports = router;
