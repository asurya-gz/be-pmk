const express = require("express");
const router = express.Router();
const VotingController = require("../../controllers/voting/votingController");

router.get("/voting", VotingController.getVotingDefault);
router.put("/update-voting", VotingController.updateVotingStatus);
router.post("/reset-pemira", VotingController.resetPemira);

module.exports = router;
