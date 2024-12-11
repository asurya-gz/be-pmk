const CandidateModel = require("../../models/candidates/candidatesModel");

exports.addCandidate = (req, res) => {
  const { name } = req.body;
  const imagePath = req.file ? req.file.filename : null; // Ambil nama file unik

  // Validasi input
  if (!name || !imagePath) {
    return res
      .status(400)
      .json({ message: "Name dan image tidak boleh kosong" });
  }

  // Panggil fungsi model untuk menambahkan kandidat
  CandidateModel.addCandidate(name, imagePath, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal menambahkan kandidat", error: err.message });
    }

    return res
      .status(201)
      .json({ message: "Kandidat berhasil ditambahkan", candidate: result });
  });
};

exports.getCandidatesVisiAndMisi = (req, res) => {
  CandidateModel.getCandidatesVisiAndMisi((err, candidates) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal mengambil data kandidat", error: err.message });
    }

    return res.status(200).json({ candidates });
  });
};

exports.deleteCandidate = (req, res) => {
  const { id } = req.params;

  CandidateModel.deleteCandidate(id, (err, result) => {
    if (err) {
      console.error("Error deleting candidate:", err);
      return res.status(500).json({ message: "Failed to delete candidate" });
    }

    res.status(200).json(result);
  });
};
