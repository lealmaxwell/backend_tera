const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Configuração do .env
require("dotenv").config();

// Configurar middlewares e parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexão com o banco de dados MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Definir as rotas
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
