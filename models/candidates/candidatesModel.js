const db = require("../../db.js");

exports.addCandidate = (name, imagePath, callback) => {
  const query =
    "INSERT INTO candidates (name, image_path, created_at) VALUES (?, ?, ?)";
  const values = [name, imagePath, new Date()];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }
    callback(null, { id: result.insertId, name, image_path: imagePath });
  });
};

// Fungsi untuk mendapatkan kandidat beserta visi dan misinya
exports.getCandidatesVisiAndMisi = (callback) => {
  const query = `
    SELECT 
      c.id AS candidate_id,
      c.name AS candidate_name,
      c.image_path,
      v.vision AS vision,
      m.mission AS mission
    FROM 
      candidates AS c
    LEFT JOIN 
      visions AS v 
    ON 
      c.id = v.candidate_id
    LEFT JOIN 
      missions AS m 
    ON 
      c.id = m.candidate_id
    ORDER BY 
      c.id, v.id, m.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }

    // Strukturkan data agar kandidat memiliki daftar visi dan misi
    const candidatesMap = {};

    results.forEach((row) => {
      if (!candidatesMap[row.candidate_id]) {
        candidatesMap[row.candidate_id] = {
          id: row.candidate_id,
          name: row.candidate_name,
          image_path: row.image_path,
          visions: [],
          missions: [],
        };
      }

      if (
        row.vision &&
        !candidatesMap[row.candidate_id].visions.includes(row.vision)
      ) {
        candidatesMap[row.candidate_id].visions.push(row.vision);
      }

      if (
        row.mission &&
        !candidatesMap[row.candidate_id].missions.includes(row.mission)
      ) {
        candidatesMap[row.candidate_id].missions.push(row.mission);
      }
    });

    // Ubah map menjadi array
    const candidates = Object.values(candidatesMap);

    callback(null, candidates);
  });
};

exports.deleteCandidate = (candidateId, callback) => {
  // Query untuk menghapus visi dan misi yang terhubung dengan kandidat
  const deleteVisionsQuery = "DELETE FROM visions WHERE candidate_id = ?";
  const deleteMissionsQuery = "DELETE FROM missions WHERE candidate_id = ?";
  const deleteCandidateQuery = "DELETE FROM candidates WHERE id = ?";

  // Eksekusi query secara berurutan untuk memastikan urutan penghapusan
  db.query(deleteVisionsQuery, [candidateId], (err) => {
    if (err) {
      console.error("Error deleting visions:", err);
      return callback(err, null);
    }

    db.query(deleteMissionsQuery, [candidateId], (err) => {
      if (err) {
        console.error("Error deleting missions:", err);
        return callback(err, null);
      }

      db.query(deleteCandidateQuery, [candidateId], (err, result) => {
        if (err) {
          console.error("Error deleting candidate:", err);
          return callback(err, null);
        }

        if (result.affectedRows === 0) {
          return callback(new Error("Candidate not found"), null);
        }

        callback(null, { message: "Candidate deleted successfully" });
      });
    });
  });
};
