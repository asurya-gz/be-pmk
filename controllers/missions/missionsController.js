const missionModel = require("../../models/missions/missionsModel");

exports.addMission = (req, res) => {
  const { candidateId, mission } = req.body;

  if (!candidateId || !mission) {
    return res
      .status(400)
      .json({ message: "Candidate ID and mission are required" });
  }

  missionModel.createMission(candidateId, mission, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding mission", error: err });
    }

    res.status(201).json({
      message: "Mission added successfully",
      missionId: result.insertId,
    });
  });
};

exports.getMissions = (req, res) => {
  const { candidateId } = req.body;

  if (!candidateId) {
    return res.status(400).json({ message: "Candidate ID is required" });
  }

  missionModel.getMissionsByCandidateId(candidateId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching missions", error: err });
    }

    res.status(200).json({ missions: results });
  });
};

exports.deleteMission = (req, res) => {
  const { missionId } = req.body;

  if (!missionId) {
    return res.status(400).json({ message: "Mission ID is required" });
  }

  missionModel.deleteMissionById(missionId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting mission", error: err });
    }

    res.status(200).json({ message: "Mission deleted successfully" });
  });
};
