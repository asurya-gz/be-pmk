const db = require("../../db.js");

exports.addVote = (voterNim, candidateId, callback) => {
  const query =
    "INSERT INTO votes (voter_nim, candidate_id, created_at) VALUES (?, ?, ?)";
  const values = [voterNim, candidateId, new Date()];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }
    callback(null, {
      id: result.insertId,
      voter_nim: voterNim,
      candidate_id: candidateId,
    });
  });
};

// Fungsi untuk memeriksa apakah voter sudah memilih
exports.checkVoteExists = (voterNim, callback) => {
  const query = "SELECT * FROM votes WHERE voter_nim = ?";
  db.query(query, [voterNim], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }
    callback(null, results.length > 0); // Mengembalikan true jika voter sudah memilih
  });
};

exports.getAllVotes = (callback) => {
  const query = `
    SELECT 
      id,
      voter_nim,
      candidate_id,
      DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
    FROM votes
    ORDER BY created_at DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }

    // Pastikan results adalah array (meskipun kosong)
    const votes = Array.isArray(results) ? results : [];

    // Log untuk debugging
    console.log("Found votes:", votes);

    callback(null, votes);
  });
};
