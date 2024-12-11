const mysql = require("mysql2");
require("dotenv").config();

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error("Gagal terhubung ke database:", err.message);
    process.exit(1);
  }
  console.log("Berhasil terhubung ke database");
});

module.exports = db;
