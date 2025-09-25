// Seleciona o formulário
const formNovoCliente = document.getElementById("formNovoCliente");

formNovoCliente.addEventListener("submit", function(e) {
  e.preventDefault(); // Evita recarregar a página

  // Pega os valores dos inputs
  const cliente = {
    nome: document.getElementById("nomeCliente").value.trim(),
    cpf: document.getElementById("cpfCliente").value.trim(),
    data_nascimento: document.getElementById("dataNascimento").value,
    endereco: document.getElementById("enderecoCliente").value.trim()
  };

  // Validação mínima
  if (!cliente.nome || !cliente.cpf || !cliente.data_nascimento || !cliente.endereco) {
    alert("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  // Envia para o backend
  fetch("http://localhost:3000/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  })
  .then(res => {
    if (!res.ok) return res.json().then(err => { throw new Error(err.error); });
    return res.json();
  })
  .then(data => {
    alert("Cliente cadastrado com sucesso!");
    formNovoCliente.reset();
    carregarClientes();
  })
  .catch(err => {
    alert(err.message);
  });
});




const btnBuscarCliente = document.getElementById("btnBuscarCliente");
const formEditarCliente = document.getElementById("formEditarCliente");

// Buscar cliente pelo ID
btnBuscarCliente.addEventListener("click", () => {
  const id = document.getElementById("idCliente").value.trim();
  if (!id) return alert("Informe o ID do cliente!");

  fetch(`http://localhost:3000/api/clientes/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Cliente não encontrado");
      return res.json();
    })
    .then(cliente => {
      // Preenche os campos do form
      document.getElementById("nomeEditar").value = cliente.nome;
      document.getElementById("cpfEditar").value = cliente.cpf;
      document.getElementById("dataEditar").value = cliente.data_nascimento.slice(0,10); // YYYY-MM-DD
      document.getElementById("enderecoEditar").value = cliente.endereco;

      // Mostra o form
      formEditarCliente.classList.remove("d-none");
    })
    .catch(err => {
      alert(err.message);
      formEditarCliente.classList.add("d-none");
    });
});

// Enviar alterações
formEditarCliente.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("idCliente").value.trim();
  const clienteAtualizado = {
    nome: document.getElementById("nomeEditar").value.trim(),
    cpf: document.getElementById("cpfEditar").value.trim(),
    data_nascimento: document.getElementById("dataEditar").value,
    endereco: document.getElementById("enderecoEditar").value.trim()
  };

  fetch(`http://localhost:3000/api/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clienteAtualizado)
  })
    .then(res => {
      if (!res.ok) return res.json().then(err => { throw new Error(err.error); });
      return res.json();
    })
    .then(data => {
      alert(data.message);
      formEditarCliente.reset();
      formEditarCliente.classList.add("d-none");
      carregarClientes(); // Atualiza a tabela
    })
    .catch(err => {
      alert(err.message); // Exibe "Já existe outro cliente com este CPF"
    });
});


const formExcluirCliente = document.getElementById('formExcluirCliente');
const confirmExcluirModalEl = document.getElementById('confirmExcluirModal');
const confirmExcluirModal = new bootstrap.Modal(confirmExcluirModalEl);
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const modalBody = confirmExcluirModalEl.querySelector('.modal-body');

let nomeClienteParaExcluir = ''; // guarda o nome do cliente

formExcluirCliente.addEventListener('submit', function(e) {
  e.preventDefault(); // evita envio direto

  const clienteID = document.getElementById('clienteID').value.trim();
  if (!clienteID) return alert('Informe o ID do cliente!');

  // Buscar nome do cliente antes de mostrar modal
  fetch(`http://localhost:3000/api/clientes/${clienteID}`)
    .then(res => {
      if (!res.ok) throw new Error('Cliente não encontrado');
      return res.json();
    })
    .then(cliente => {
      nomeClienteParaExcluir = cliente.nome; // guarda nome
      modalBody.textContent = `Tem certeza que deseja excluir ${nomeClienteParaExcluir}? Esta ação não pode ser desfeita.`;
      confirmExcluirModal.show(); // abre modal
    })
    .catch(err => {
      alert(err.message);
    });
});

confirmDeleteBtn.addEventListener('click', function() {
  const clienteID = document.getElementById('clienteID').value;

  // Desativa o botão e mostra loading
  confirmDeleteBtn.disabled = true;
  confirmDeleteBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Excluindo...`;

  fetch(`http://localhost:3000/api/clientes/${clienteID}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);

    // Atualiza as tabelas
    carregarClientes();
    carregarContatos();

    confirmExcluirModal.hide();
    formExcluirCliente.reset();
  })
  .catch(err => {
    console.error("Erro ao excluir cliente:", err);
    alert("Ocorreu um erro ao excluir o cliente.");
  })
  .finally(() => {
    // Restaura o botão
    confirmDeleteBtn.disabled = false;
    confirmDeleteBtn.innerHTML = "Excluir";
  });
});

