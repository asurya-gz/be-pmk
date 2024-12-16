const db = require("../../db.js");

exports.createVoter = (voterData, callback) => {
  const { nama, nim, angkatan, jurusan, email } = voterData;

  // Validasi input
  if (!nama || !nim || !angkatan || !jurusan || !email) {
    return callback(
      new Error(
        "Semua kolom (nama, nim, angkatan, jurusan, email) harus diisi"
      ),
      null
    );
  }

  // Query untuk memasukkan data voter ke database
  const query = `
    INSERT INTO voters (nama, nim, angkatan, jurusan, email) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [nama, nim, angkatan, jurusan, email], (err, result) => {
    if (err) {
      console.error("Gagal membuat voter:", err);
      return callback(err, null);
    }

    callback(null, {
      id: result.insertId,
      nama,
      nim,
      angkatan,
      jurusan,
      email,
      message: "Data voter berhasil ditambahkan",
    });
  });
};

exports.getAllVoters = (callback) => {
  // Query untuk mengambil semua data dari tabel voters
  const query = "SELECT * FROM voters";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Gagal mengambil data voters:", err);
      return callback(err, null);
    }

    // Jika data ditemukan, kembalikan hasilnya
    callback(null, results);
  });
};
