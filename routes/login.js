const express = require("express");
const router = express.Router();

//Since once the user is successfully authenticated, you would have req.user available throughout the whole session. At this point, you can redirect to something like the have in the example /account and check if req.user with req.isAuthenticated() and complete the flow you desire.

// Handle successful authentication
router.get("/success"); //TODO:

// Handle authentication failure
router.get("/failure"); //TODO:

module.exports = router;
