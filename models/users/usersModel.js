const db = require("../../db.js");
const bcrypt = require("bcryptjs");

exports.createUser = (username, password, callback) => {
  // Cek apakah username sudah ada
  const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUsernameQuery, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }

    if (results.length > 0) {
      return callback(new Error("Username sudah terdaftar"), null);
    }

    // Hash password sebelum menyimpannya
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Password hashing error:", err);
        return callback(err, null);
      }

      // Masukkan data user ke database
      const query =
        "INSERT INTO users (username, password, created_at) VALUES (?, ?, ?)";
      const values = [username, hashedPassword, new Date()];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Insert user error:", err);
          return callback(err, null);
        }
        callback(null, result);
      });
    });
  });
};

exports.loginUser = (username, password, callback) => {
  // Cari pengguna berdasarkan username
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback(new Error("Username tidak ditemukan"), null);
    }

    const user = results[0];

    // Bandingkan password yang diinput dengan hash di database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return callback(err, null);
      }

      if (!isMatch) {
        return callback(new Error("Password salah"), null);
      }

      // Berhasil login, kembalikan data pengguna
      callback(null, { id: user.id, username: user.username });
    });
  });
};

exports.updatePassword = (userId, oldPassword, newPassword, callback) => {
  // Step 1: Find the user by userId
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback(new Error("User not found"), null);
    }

    const user = results[0];

    // Step 2: Compare the old password with the one in the database
    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return callback(err, null);
      }

      if (!isMatch) {
        return callback(new Error("Old password is incorrect"), null);
      }

      // Step 3: Hash the new password
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Password hashing error:", err);
          return callback(err, null);
        }

        // Step 4: Update the user's password in the database
        const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
        db.query(updateQuery, [hashedPassword, userId], (err, result) => {
          if (err) {
            console.error("Error updating password:", err);
            return callback(err, null);
          }

          // Return success
          callback(null, { message: "Password updated successfully" });
        });
      });
    });
  });
};


