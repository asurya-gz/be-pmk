const express = require("express");
const router = express.Router();
const MissionsController = require("../../controllers/missions/missionsController");

// Tambah misi baru
router.post("/missions", MissionsController.addMission);

// Ambil misi berdasarkan candidate ID dari body
router.post("/missions/get", MissionsController.getMissions);

// Hapus misi berdasarkan ID dari body
router.post("/missions/delete", MissionsController.deleteMission);

module.exports = router;
