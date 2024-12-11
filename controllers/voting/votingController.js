const VotingModel = require("../../models/voting/votingModel");

exports.getVotingDefault = (req, res) => {
  const id = 1; // ID default

  // Memanggil fungsi model untuk mendapatkan data voting dengan ID default
  VotingModel.getVotingById(id, (err, voting) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(200).json(voting);
  });
};

// Controller untuk mengupdate status voting
exports.updateVotingStatus = (req, res) => {
  const id = 1; // ID default
  const { status } = req.body;

  // Validasi input
  if (!status) {
    return res.status(400).json({ message: "Status harus diisi" });
  }

  // Memanggil fungsi model untuk mengupdate status
  VotingModel.updateVotingStatus(id, status, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(200).json(result);
  });
};

exports.resetPemira = (req, res) => {
  VotingModel.resetPemira((err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json(result);
  });
};
