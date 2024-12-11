const VisionModel = require("../../models/visions/visionsMode");

exports.addVision = (req, res) => {
  const { candidateId, vision } = req.body;

  if (!candidateId || !vision) {
    return res
      .status(400)
      .json({ message: "Candidate ID dan Vision wajib diisi" });
  }

  VisionModel.createVision(candidateId, vision, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal menambahkan visi", error: err.message });
    }
    res
      .status(201)
      .json({ message: "Visi berhasil ditambahkan", data: result });
  });
};

exports.getVisions = (req, res) => {
  const { candidateId } = req.body;

  if (!candidateId) {
    return res.status(400).json({ message: "Candidate ID wajib diisi" });
  }

  VisionModel.getVisionsByCandidateId(candidateId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal mengambil visi", error: err.message });
    }
    res.status(200).json({ message: "Berhasil mengambil visi", data: results });
  });
};

exports.deleteVision = (req, res) => {
  const { visionId } = req.body;

  if (!visionId) {
    return res.status(400).json({ message: "Vision ID wajib diisi" });
  }

  VisionModel.deleteVisionById(visionId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal menghapus visi", error: err.message });
    }
    res.status(200).json({ message: "Visi berhasil dihapus", data: result });
  });
};
