const db = require("../../db.js");

// Fungsi untuk mengambil data voting berdasarkan id
exports.getVotingById = (id, callback) => {
  const query = "SELECT * FROM voting WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback(
        new Error("Voting dengan ID tersebut tidak ditemukan"),
        null
      );
    }

    // Berhasil mendapatkan data
    callback(null, results[0]);
  });
};

exports.updateVotingStatus = (id, status, callback) => {
  // Validasi status yang diperbolehkan
  const allowedStatuses = ["tutup", "berlangsung", "selesai"];
  if (!allowedStatuses.includes(status)) {
    return callback(new Error("Status voting tidak valid"), null);
  }

  const query = "UPDATE voting SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);
    }

    if (result.affectedRows === 0) {
      return callback(
        new Error("Voting dengan ID tersebut tidak ditemukan"),
        null
      );
    }

    // Berhasil mengupdate status
    callback(null, {
      id,
      status,
      message: "Status voting berhasil diperbarui",
    });
  });
};

exports.resetPemira = (callback) => {
  const tables = ["votes", "voters", "visions", "missions", "candidates"];

  // Menonaktifkan foreign key checks
  db.query("SET FOREIGN_KEY_CHECKS = 0;", (err) => {
    if (err) {
      console.error("Gagal menonaktifkan FOREIGN_KEY_CHECKS:", err);
      return callback(err, null);
    }

    // Fungsi untuk menjalankan truncate per tabel
    const truncateTable = (table) =>
      new Promise((resolve, reject) => {
        db.query(`TRUNCATE TABLE ${table};`, (err) => {
          if (err) {
            console.error(`Gagal mereset tabel ${table}:`, err);
            reject(err);
          } else {
            console.log(`Berhasil mereset tabel ${table}`);
            resolve();
          }
        });
      });

    // Eksekusi truncate untuk setiap tabel
    Promise.all(tables.map((table) => truncateTable(table)))
      .then(() => {
        // Mengaktifkan kembali foreign key checks
        db.query("SET FOREIGN_KEY_CHECKS = 1;", (err) => {
          if (err) {
            console.error("Gagal mengaktifkan FOREIGN_KEY_CHECKS:", err);
            return callback(err, null);
          }
          callback(null, { message: "Semua data Pemira berhasil dihapus." });
        });
      })
      .catch((err) => {
        // Mengaktifkan kembali foreign key checks meski ada error
        db.query("SET FOREIGN_KEY_CHECKS = 1;", () => {
          callback(err, null);
        });
      });
  });
};
