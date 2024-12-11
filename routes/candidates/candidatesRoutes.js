const express = require("express");
const router = express.Router();
const CandidateController = require("../../controllers/candidates/candidatesController");
const upload = require("../../middlewares/uploadMiddleware");

// Route untuk menambahkan kandidat dengan upload foto
router.post(
  "/add-candidates",
  upload.single("image"),
  CandidateController.addCandidate
);

router.get("/candidate", CandidateController.getCandidatesVisiAndMisi);
router.delete("/candidate/:id", CandidateController.deleteCandidate);

module.exports = router;
