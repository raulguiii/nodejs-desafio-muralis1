let clientesData = [];
let contatosData = [];
const pageSize = 5; // máximo por página

// ----------- CLIENTES -----------
function renderClientes(page = 1) {
  const tbody = document.getElementById("tabelaClientes");
  tbody.innerHTML = "";

  // calcular índice inicial e final
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginaClientes = clientesData.slice(start, end);

  paginaClientes.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nome}</td>
      <td>${c.cpf}</td>
      <td>${new Date(c.data_nascimento).toLocaleDateString("pt-BR")}</td>
      <td>${c.endereco}</td>
    `;
    tbody.appendChild(tr);
  });

  renderPaginacao("paginacaoClientes", clientesData.length, page, renderClientes);
}

function carregarClientes() {
  const tbody = document.getElementById("tabelaClientes");
  tbody.innerHTML = `<tr><td colspan="5" class="text-center">Carregando clientes...</td></tr>`;

  fetch("http://localhost:3000/api/clientes")
    .then(res => res.json())
    .then(data => {
      clientesData = data;
      if (!clientesData.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhum cliente encontrado</td></tr>`;
        return;
      }
      renderClientes(1);
    })
    .catch(() => {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar clientes</td></tr>`;
    });
}

// ----------- CONTATOS -----------
function renderContatos(page = 1) {
  const tbody = document.getElementById("tabelaContatos");
  tbody.innerHTML = "";

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginaContatos = contatosData.slice(start, end);

  paginaContatos.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nome_cliente}</td>
      <td>${c.tipo}</td>
      <td>${c.valor}</td>
      <td>${c.observacao || "-"}</td>
    `;
    tbody.appendChild(tr);
  });

  renderPaginacao("paginacaoContatos", contatosData.length, page, renderContatos);
}

function carregarContatos() {
  const tbody = document.getElementById("tabelaContatos");
  tbody.innerHTML = `<tr><td colspan="5" class="text-center">Carregando contatos...</td></tr>`;

  fetch("http://localhost:3000/api/contatos")
    .then(res => res.json())
    .then(data => {
      contatosData = data;
      if (!contatosData.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhum contato encontrado</td></tr>`;
        return;
      }
      renderContatos(1);
    })
    .catch(() => {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar contatos</td></tr>`;
    });
}

// ----------- PAGINAÇÃO GENÉRICA -----------
function renderPaginacao(containerId, totalItems, currentPage, callback) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (totalPages <= 1) return;

  // Botão anterior
  const prev = document.createElement("button");
  prev.textContent = "«";
  prev.className = "btn btn-sm btn-light me-1";
  prev.disabled = currentPage === 1;
  prev.onclick = () => callback(currentPage - 1);
  container.appendChild(prev);

  // Botões de página
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `btn btn-sm ${i === currentPage ? "btn-primary" : "btn-light"} me-1`;
    btn.onclick = () => callback(i);
    container.appendChild(btn);
  }

  // Botão próximo
  const next = document.createElement("button");
  next.textContent = "»";
  next.className = "btn btn-sm btn-light";
  next.disabled = currentPage === totalPages;
  next.onclick = () => callback(currentPage + 1);
  container.appendChild(next);
}

// ----------- INIT -----------
window.addEventListener("DOMContentLoaded", () => {
  carregarClientes();
  carregarContatos();
});

// 🔹 Busca (mantida igual, mas filtra o array todo e re-renderiza página 1)
function filtrarTabela(inputId, data, renderFn) {
  const filtro = document.getElementById(inputId).value.toLowerCase();
  const filtrados = data.filter(item =>
    item.nome?.toLowerCase().includes(filtro) || item.nome_cliente?.toLowerCase().includes(filtro)
  );

  if (renderFn === renderClientes) {
    clientesData = filtrados;
    renderClientes(1);
  } else {
    contatosData = filtrados;
    renderContatos(1);
  }
}

document.getElementById('inputBuscaClientes').addEventListener('keyup', () => {
  fetch("http://localhost:3000/api/clientes")
    .then(res => res.json())
    .then(data => filtrarTabela('inputBuscaClientes', data, renderClientes));
});

document.getElementById('inputBuscaContatos').addEventListener('keyup', () => {
  fetch("http://localhost:3000/api/contatos")
    .then(res => res.json())
    .then(data => filtrarTabela('inputBuscaContatos', data, renderContatos));
});
