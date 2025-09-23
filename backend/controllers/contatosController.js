const db = require("../db");

// 🔹 GET todos os contatos com nome do cliente
exports.getContatos = (req, res) => {
  const sql = `
    SELECT contatos.id, clientes.nome AS nome_cliente, contatos.tipo, contatos.valor, contatos.observacao
    FROM contatos
    INNER JOIN clientes ON contatos.cliente_id = clientes.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar contatos" });
    res.json(results);
  });
};

// 🔹 POST para criar um novo contato
exports.createContato = (req, res) => {
  const { cliente_id, tipo, valor, observacao } = req.body;

  if (!cliente_id || !tipo || !valor) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  // Verifica se o cliente existe
  db.query("SELECT * FROM clientes WHERE id = ?", [cliente_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar cliente" });
    if (!results.length) return res.status(404).json({ error: "Cliente não encontrado" });

    // Insere o contato
    const sql = "INSERT INTO contatos (cliente_id, tipo, valor, observacao) VALUES (?, ?, ?, ?)";
    db.query(sql, [cliente_id, tipo, valor, observacao || null], (err2, result) => {
      if (err2) {
        console.error("Erro ao inserir contato:", err2);
        return res.status(500).json({ error: "Erro ao cadastrar contato" });
      }
      res.json({ message: "Contato cadastrado com sucesso", id: result.insertId });
    });
  });
};

// ✅ GET contato por ID
exports.getContatoById = (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT contatos.id, contatos.cliente_id, contatos.tipo, contatos.valor, contatos.observacao
    FROM contatos
    WHERE contatos.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar contato" });
    if (results.length === 0) return res.status(404).json({ error: "Contato não encontrado" });
    res.json(results[0]);
  });
};

// PUT atualizar contato (já existente)
exports.updateContato = (req, res) => {
  const id = req.params.id;
  const { tipo, valor, observacao } = req.body;

  const sql = `UPDATE contatos SET tipo = ?, valor = ?, observacao = ? WHERE id = ?`;

  db.query(sql, [tipo, valor, observacao, id], (err) => {
    if (err) {
      console.error("Erro ao atualizar contato:", err); // <-- adicione isso para debug
      return res.status(500).json({ error: "Erro ao atualizar contato" });
    }
    res.json({ message: "Contato atualizado com sucesso!" });
  });
};


// 🔹 DELETE para remover contato
exports.deleteContato = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM contatos WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir contato:", err);
      return res.status(500).json({ error: "Erro ao excluir contato" });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: "Contato não encontrado" });
    res.json({ message: "Contato excluído com sucesso" });
  });
};
