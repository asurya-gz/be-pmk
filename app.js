const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const path = require("path");

const usersRoutes = require("./routes/users/usersRoutes");
const votingRoutes = require("./routes/voting/votingRoutes");
const votersRoutes = require("./routes/voters/votersRoutes");
const candidatesRoutes = require("./routes/candidates/candidatesRoutes");
const missionsRoutes = require("./routes/missions/missionsRoutes");
const visionsRoutes = require("./routes/visions/visionsRoutes");
const votesRoutes = require("./routes/votes/votesRoutes");

// Opsi CORS untuk mengizinkan hanya localhost:3000
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode yang diizinkan
//   credentials: true, // Izinkan cookies
//   optionsSuccessStatus: 200, // Untuk beberapa versi lama browsers
// };
const corsOptions = {
  origin: "https://pemirapmkfsm.up.railway.app/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode yang diizinkan
  credentials: true, // Izinkan cookies
  optionsSuccessStatus: 200, // Untuk beberapa versi lama browsers
};

// Middleware untuk mengizinkan CORS
app.use(cors(corsOptions));

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk membuat folder uploads statis
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", usersRoutes);
app.use("/api", votingRoutes);
app.use("/api", votersRoutes);
app.use("/api", candidatesRoutes);
app.use("/api", missionsRoutes);
app.use("/api", visionsRoutes);
app.use("/votes", votesRoutes);

// Mulai server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
