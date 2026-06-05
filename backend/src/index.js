require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend Voz del Ciudadano funcionando correctamente",
  });
});

// Rutas principales
// Las activaremos cuando creemos proposalRoutes
// app.use("/api/proposals", proposalRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});