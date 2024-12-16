const VoterModel = require("../../models/voters/votersModel");

exports.addVoter = (req, res) => {
  const { nama, nim, angkatan, jurusan, email } = req.body;

  // Memanggil model untuk membuat voter
  VoterModel.createVoter(
    { nama, nim, angkatan, jurusan, email },
    (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      return res.status(201).json(result);
    }
  );
};

exports.getAllVoters = (req, res) => {
  VoterModel.getAllVoters((err, voters) => {
    if (err) {
      console.error("Gagal mengambil data voters:", err.message);
      return res.status(500).json({
        message: "Terjadi kesalahan pada server saat mengambil data voters",
      });
    }

    // Berhasil mengambil data voters
    return res.status(200).json(voters);
  });
};
