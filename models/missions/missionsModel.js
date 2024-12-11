const db = require("../../db.js");

exports.createMission = (candidateId, mission, callback) => {
  const query =
    "INSERT INTO missions (candidate_id, mission, created_at) VALUES (?, ?, ?)";
  const values = [candidateId, mission, new Date()];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error creating mission:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.getMissionsByCandidateId = (candidateId, callback) => {
  const query = "SELECT * FROM missions WHERE candidate_id = ?";
  db.query(query, [candidateId], (err, results) => {
    if (err) {
      console.error("Error fetching missions:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

exports.deleteMissionById = (missionId, callback) => {
  const query = "DELETE FROM missions WHERE id = ?";
  db.query(query, [missionId], (err, result) => {
    if (err) {
      console.error("Error deleting mission:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
