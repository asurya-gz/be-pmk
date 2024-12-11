const express = require("express");
const usersController = require("../../controllers/users/usersController");

const router = express.Router();

router.post("/create", usersController.createUser);

router.post("/login", usersController.loginUser);
router.post("/change-password", usersController.changePassword);

module.exports = router;
