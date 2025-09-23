const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

// ✅ GET cliente por ID (tem que vir antes do GET geral)
router.get("/:id", clientesController.getClienteById);

// GET geral
router.get("/", clientesController.getClientes);

// POST para cadastrar cliente
router.post("/", clientesController.createCliente);

// PUT para atualizar cliente
router.put("/:id", clientesController.updateCliente);

// DELETE cliente (junto com contatos)
router.delete("/:id", clientesController.deleteCliente);

module.exports = router;
