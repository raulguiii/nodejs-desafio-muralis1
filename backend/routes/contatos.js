const express = require("express");
const router = express.Router();
const contatosController = require("../controllers/contatosController");

// GET todos os contatos
router.get("/", contatosController.getContatos);

// ✅ GET contato por ID
router.get("/:id", contatosController.getContatoById);

// POST para criar contato
router.post("/", contatosController.createContato);

// PUT para atualizar contato
router.put("/:id", contatosController.updateContato);

// DELETE para remover contato
router.delete("/:id", contatosController.deleteContato);

module.exports = router;
