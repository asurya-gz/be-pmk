const express = require("express");
const router = express.Router();
const voteController = require("../../controllers/votes/votesController");

// Letakkan route spesifik di atas route dengan parameter
router.get("/get-all", voteController.getAllVotes);

// Route dengan parameter di bawah
router.post("/:nim", voteController.addVote);
router.get("/:nim", voteController.checkVote);

module.exports = router;
