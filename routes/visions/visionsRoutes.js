const express = require("express");
const router = express.Router();
const VisionController = require("../../controllers/visions/visionsController");

// Tambah visi baru
router.post("/visions", VisionController.addVision);

// Ambil visi berdasarkan candidate ID
router.post("/visions/get", VisionController.getVisions);

// Hapus visi berdasarkan ID
router.post("/visions/delete", VisionController.deleteVision);

module.exports = router;
