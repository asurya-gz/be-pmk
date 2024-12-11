const userModel = require("../../models/users/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password diperlukan" });
  }

  // Panggil model untuk login user
  userModel.loginUser(username, password, (err, user) => {
    if (err) {
      console.error("Error logging in user:", err);

      if (
        err.message === "Username tidak ditemukan" ||
        err.message === "Password salah"
      ) {
        return res.status(400).json({ message: err.message });
      }

      return res
        .status(500)
        .json({ message: "Gagal login user", error: err.message });
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user,
    });
  });
};

exports.createUser = (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password diperlukan" });
  }

  // Validasi panjang password
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password harus minimal 6 karakter" });
  }

  // Panggil model untuk membuat user baru
  userModel.createUser(username, password, (err, result) => {
    if (err) {
      console.error("Error creating user:", err);

      if (err.message === "Username sudah terdaftar") {
        return res.status(400).json({ message: err.message });
      }

      return res
        .status(500)
        .json({ message: "Gagal membuat user", error: err.message });
    }

    res.status(201).json({
      message: "User berhasil dibuat",
      userId: result.insertId,
    });
  });
};

exports.changePassword = (req, res) => {
  const { userId, oldPassword, newPassword, confirmPassword } = req.body;

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Call the model function to update the password
  userModel.updatePassword(userId, oldPassword, newPassword, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(200).json(result);
  });
};
