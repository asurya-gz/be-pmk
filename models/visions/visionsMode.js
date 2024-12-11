const db = require("../../db");

// Tambahkan visi baru
exports.createVision = (candidateId, vision, callback) => {
  const query =
    "INSERT INTO visions (candidate_id, vision, created_at) VALUES (?, ?, ?)";
  const values = [candidateId, vision, new Date()];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding vision:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Ambil visi berdasarkan candidate ID
exports.getVisionsByCandidateId = (candidateId, callback) => {
  const query = "SELECT * FROM visions WHERE candidate_id = ?";

  db.query(query, [candidateId], (err, results) => {
    if (err) {
      console.error("Error fetching visions:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Hapus visi berdasarkan ID
exports.deleteVisionById = (visionId, callback) => {
  const query = "DELETE FROM visions WHERE id = ?";

  db.query(query, [visionId], (err, result) => {
    if (err) {
      console.error("Error deleting vision:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
