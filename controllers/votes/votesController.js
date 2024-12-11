const voteModel = require("../../models/votes/votesModel");

// Controller untuk menambahkan vote
exports.addVote = (req, res) => {
  const { candidate_id } = req.body; // Ambil kandidat dari body request
  const voterNim = req.params.nim; // Ambil voter_nim dari parameter URL

  if (!candidate_id) {
    return res.status(400).json({ message: "Candidate ID is required" });
  }

  // Periksa apakah voter sudah memilih
  voteModel.checkVoteExists(voterNim, (err, exists) => {
    if (err) {
      console.error("Error checking vote existence:", err);
      return res.status(500).json({ message: "Error checking vote existence" });
    }

    if (exists) {
      return res.status(400).json({ message: "Voter has already voted" });
    }

    // Tambahkan vote jika voter belum memilih
    voteModel.addVote(voterNim, candidate_id, (err, result) => {
      if (err) {
        console.error("Error adding vote:", err);
        return res.status(500).json({ message: "Failed to add vote" });
      }

      res.status(200).json({
        message: "Vote added successfully",
        vote: result,
      });
    });
  });
};

// Controller untuk memeriksa apakah voter sudah memilih
exports.checkVote = (req, res) => {
  const voterNim = req.params.nim; // Ambil voter_nim dari parameter URL

  voteModel.checkVoteExists(voterNim, (err, exists) => {
    if (err) {
      console.error("Error checking vote existence:", err);
      return res.status(500).json({ message: "Error checking vote existence" });
    }

    res.status(200).json({
      message: exists ? "Voter has already voted" : "Voter has not voted yet",
      voted: exists, // true jika voter sudah memilih, false jika belum
    });
  });
};

exports.getAllVotes = (req, res) => {
  voteModel.getAllVotes((err, votes) => {
    if (err) {
      console.error("Error fetching votes:", err);
      return res.status(500).json({
        message: "Failed to fetch votes",
        error: err.message,
      });
    }

    // Validasi data votes
    if (!votes) {
      return res.status(200).json({
        message: "No votes found",
        votes: [],
      });
    }

    // Log untuk debugging
    console.log("Retrieved votes:", votes);

    res.status(200).json({
      message: "Votes retrieved successfully",
      total: votes.length,
      votes: votes,
    });
  });
};
