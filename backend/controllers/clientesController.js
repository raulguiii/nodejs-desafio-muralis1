const db = require("../db");

// GET clientes
exports.getClientes = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar clientes" });
    }
    res.json(results);
  });
};

// Criar novo cliente
exports.createCliente = (req, res) => {
  const { nome, cpf, data_nascimento, endereco } = req.body;

  if (!nome || !cpf || !data_nascimento || !endereco) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = "INSERT INTO clientes (nome, cpf, data_nascimento, endereco) VALUES (?, ?, ?, ?)";
  db.query(sql, [nome, cpf, data_nascimento, endereco], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "⚠️ Já existe um cliente com este CPF" });
      }
      console.error(err);
      return res.status(500).json({ error: "Erro ao cadastrar cliente" });
    }

    res.status(201).json({ id: result.insertId, nome, cpf, data_nascimento, endereco });
  });
};


// GET cliente por ID
exports.getClienteById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM clientes WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar cliente" });
    if (!results.length) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(results[0]);
  });
};

// PUT atualizar cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, endereco } = req.body;

  if (!nome || !cpf || !data_nascimento || !endereco) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Verifica se o CPF já existe em outro cliente
  const checkCpfSql = "SELECT id FROM clientes WHERE cpf = ? AND id != ?";
  db.query(checkCpfSql, [cpf, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar CPF" });

    if (results.length > 0) {
      return res.status(400).json({ error: "⚠️ Já existe outro cliente com este CPF" });
    }

    // Se não existir, atualiza
    const sql = "UPDATE clientes SET nome = ?, cpf = ?, data_nascimento = ?, endereco = ? WHERE id = ?";
    db.query(sql, [nome, cpf, data_nascimento, endereco, id], (err2, result) => {
      if (err2) return res.status(500).json({ error: "Erro ao atualizar cliente" });

      res.json({ message: "✅ Cliente atualizado com sucesso" });
    });
  });
};



// DELETE apagar cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;

  // Primeiro, verifica se o cliente existe
  const checkSql = "SELECT * FROM clientes WHERE id = ?";
  db.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar cliente" });
    if (!results.length) return res.status(404).json({ error: "Cliente não encontrado" });

    const deleteClienteSql = "DELETE FROM clientes WHERE id = ?";
    db.query(deleteClienteSql, [id], (err2, result) => {
      if (err2) {
        console.error("Erro ao excluir cliente:", err2);
        return res.status(500).json({ error: "Erro ao excluir cliente" });
      }

      res.json({ message: "✅ Cliente e contatos excluídos com sucesso" });
    });
  });
};


