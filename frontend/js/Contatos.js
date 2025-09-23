const formBusca = document.getElementById("formBuscaCliente");
const formNovoContato = document.getElementById("formNovoContato");

formBusca.addEventListener("submit", (e) => {
  e.preventDefault();
  const clienteId = document.getElementById("clienteIdBusca").value;

  // Verifica se o cliente existe no backend
  fetch(`http://localhost:3000/api/clientes/${clienteId}`)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Cliente não encontrado");
    })
    .then(cliente => {
      alert(`✅ Cliente encontrado: ${cliente.nome}`);
      formNovoContato.dataset.clienteId = cliente.id; // guarda id do cliente
      formNovoContato.classList.remove("d-none");
    })
    .catch(err => {
      alert("❌ Cliente não encontrado.");
      formNovoContato.classList.add("d-none");
    });
});

// Cadastrar novo contato
formNovoContato.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente_id = formNovoContato.dataset.clienteId;
  const tipo = document.getElementById("tipoContato").value;
  const valor = document.getElementById("valorContato").value;
  const observacao = document.getElementById("observacaoContato").value;

  fetch("http://localhost:3000/api/contatos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente_id, tipo, valor, observacao })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    formNovoContato.reset();
    formNovoContato.classList.add("d-none");
    formBusca.reset();

    // Atualiza tabela de contatos
    carregarContatos();
  })
  .catch(err => {
    console.error("Erro ao cadastrar contato:", err);
    alert("Erro ao cadastrar contato");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const btnBuscarContato = document.getElementById("btnBuscarContato");
  const formEditarContato = document.getElementById("formEditarContato");

  btnBuscarContato.addEventListener("click", () => {
    const idContato = document.getElementById("idContato").value.trim();
    if (!idContato) {
      alert("Informe o ID do contato!");
      return;
    }

    // 🔹 Buscar contato pelo ID
    fetch(`http://localhost:3000/api/contatos/${idContato}`)
      .then(res => {
        if (res.status === 404) throw new Error("Contato não encontrado");
        if (!res.ok) throw new Error("Erro ao buscar contato");
        return res.json();
      })
      .then(contato => {
        // Preencher campos do formulário
        document.getElementById("tipoContatoEditar").value = contato.tipo;
        document.getElementById("contatoEditar").value = contato.valor;
        document.getElementById("obsContatoEditar").value = contato.observacao || "";

        // Exibir formulário
        formEditarContato.classList.remove("d-none");
      })
      .catch(err => alert(err.message));
  });

  // 🔹 Enviar alterações
  formEditarContato.addEventListener("submit", (e) => {
    e.preventDefault();

    const idContato = document.getElementById("idContato").value.trim();
    const tipo = document.getElementById("tipoContatoEditar").value;
    const valor = document.getElementById("contatoEditar").value.trim();
    const observacao = document.getElementById("obsContatoEditar").value.trim();

    if (!tipo || !valor) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    fetch(`http://localhost:3000/api/contatos/${idContato}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, valor, observacao })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar contato");
        return res.json();
      })
      .then(data => {
        alert(data.message);
        formEditarContato.reset();
        formEditarContato.classList.add("d-none");
        document.getElementById("idContato").value = "";
      })
      .catch(err => alert(err.message));
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const formExcluirContato = document.getElementById("formExcluirContato");
  const confirmExcluirContatoModal = new bootstrap.Modal(document.getElementById("confirmExcluirContatoModal"));
  const confirmDeleteContatoBtn = document.getElementById("confirmDeleteContatoBtn");

  formExcluirContato.addEventListener("submit", (e) => {
    e.preventDefault();
    const idContato = document.getElementById("contatoID").value;

    // Verifica se ID foi preenchido
    if (!idContato) {
      alert("Informe o ID do contato!");
      return;
    }

    // Abre modal de confirmação
    confirmExcluirContatoModal.show();
  });

  confirmDeleteContatoBtn.addEventListener("click", () => {
    const idContato = document.getElementById("contatoID").value;

    fetch(`http://localhost:3000/api/contatos/${idContato}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("❌ " + data.error);
      } else {
        alert("✅ Contato excluído com sucesso!");
        carregarContatos(); 
      }
    })
    .catch(err => {
      console.error("Erro ao excluir contato:", err);
      alert("❌ Ocorreu um erro ao excluir o contato");
    });

    // Fecha modal e reseta formulário
    confirmExcluirContatoModal.hide();
    formExcluirContato.reset();
  });
});
