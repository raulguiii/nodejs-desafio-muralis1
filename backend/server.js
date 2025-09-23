const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rotas API
const clientesRoutes = require("./routes/clientes");
const contatosRoutes = require("./routes/contatos");

app.use("/api/clientes", clientesRoutes);
app.use("/api/contatos", contatosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
