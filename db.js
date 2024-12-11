const mysql = require("mysql2");
require("dotenv").config();

// // Konfigurasi koneksi ke database
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // Cek koneksi
// db.connect((err) => {
//   if (err) {
//     console.error("Gagal terhubung ke database:", err.message);
//     process.exit(1);
//   }
//   console.log("Berhasil terhubung ke database");
// });

// Konfigurasi connection pool ke database Railway
const dbRailwayPool = mysql.createPool({
  host: process.env.DB_HOST, // railway host
  user: process.env.DB_USER, // username
  password: process.env.DB_PASSWORD, // password
  database: process.env.DB_NAME, // nama database
  port: process.env.DB_PORT, // port untuk koneksi (58052)
  protocol: process.env.DB_PROTOCOL, // protocol TCP
  waitForConnections: true, // Menunggu koneksi yang tersedia
  connectionLimit: 10, // Jumlah maksimum koneksi yang diperbolehkan dalam pool
  queueLimit: 0, // Batas antrian (0 berarti tidak terbatas)
});

// Cek koneksi dengan pool
dbRailwayPool.getConnection((err, connection) => {
  if (err) {
    console.error("Gagal terhubung ke database Railway:", err.message);
    process.exit(1);
  }
  console.log("Berhasil terhubung ke database Railway");

  // Setelah selesai, jangan lupa untuk melepaskan koneksi kembali ke pool
  connection.release();
});

module.exports = db;
