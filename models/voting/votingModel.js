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
  // Urutan penghapusan yang mempertimbangkan foreign key
  const deleteSequence = [
    "votes", // Hapus vote terlebih dahulu
    "voters", // Kemudian hapus voter
    "visions", // Hapus visi
    "missions", // Hapus misi
    "candidates", // Terakhir hapus kandidat
  ];

  // Nonaktifkan foreign key checks
  db.query("SET FOREIGN_KEY_CHECKS = 0;", (err) => {
    if (err) {
      console.error("Gagal menonaktifkan FOREIGN_KEY_CHECKS:", err);
      return callback(err, null);
    }

    // Fungsi rekursif untuk menghapus data
    const deleteTablesRecursively = (tables) => {
      if (tables.length === 0) {
        // Semua tabel sudah dihapus
        db.query("SET FOREIGN_KEY_CHECKS = 1;", (err) => {
          if (err) {
            console.error("Gagal mengaktifkan FOREIGN_KEY_CHECKS:", err);
            return callback(err, null);
          }
          callback(null, { message: "Semua data Pemira berhasil dihapus." });
        });
        return;
      }

      const currentTable = tables[0];

      db.query(`DELETE FROM ${currentTable};`, (err) => {
        if (err) {
          console.error(
            `Gagal menghapus data dari tabel ${currentTable}:`,
            err
          );
          return callback(err, null);
        }

        // Reset auto increment
        db.query(
          `ALTER TABLE ${currentTable} AUTO_INCREMENT = 1;`,
          (resetErr) => {
            if (resetErr) {
              console.error(
                `Gagal mereset AUTO_INCREMENT untuk ${currentTable}:`,
                resetErr
              );
            }

            // Lanjut ke tabel berikutnya
            deleteTablesRecursively(tables.slice(1));
          }
        );
      });
    };

    // Mulai proses penghapusan
    deleteTablesRecursively(deleteSequence);
  });
};
