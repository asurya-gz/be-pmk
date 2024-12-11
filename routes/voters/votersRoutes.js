const express = require("express");
const router = express.Router();
const VoterController = require("../../controllers/voters/votersController");

// Endpoint untuk menambahkan voter baru
router.post("/add-voter", VoterController.addVoter);
router.get("/all-voters", VoterController.getAllVoters);

module.exports = router;
