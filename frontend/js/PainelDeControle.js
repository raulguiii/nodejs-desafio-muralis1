// 🔹 Carregar tabela de Clientes
function carregarClientes() {
  const tbody = document.getElementById("tabelaClientes");

  // Mostra loading
  tbody.innerHTML = `<tr><td colspan="5" class="text-center">Carregando clientes...</td></tr>`;

  fetch("http://localhost:3000/api/clientes")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar clientes");
      return res.json();
    })
    .then(clientes => {
      if (!clientes.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhum cliente encontrado</td></tr>`;
        return;
      }
      tbody.innerHTML = ""; // Limpa loading
      clientes.forEach(c => {
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
    })
    .catch(err => {
      console.error(err);
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar clientes</td></tr>`;
    });
}

// 🔹 Carregar tabela de Contatos
function carregarContatos() {
  const tbody = document.getElementById("tabelaContatos");

  // Mostra loading
  tbody.innerHTML = `<tr><td colspan="5" class="text-center">Carregando contatos...</td></tr>`;

  fetch("http://localhost:3000/api/contatos")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar contatos");
      return res.json();
    })
    .then(contatos => {
      if (!contatos.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhum contato encontrado</td></tr>`;
        return;
      }
      tbody.innerHTML = ""; // Limpa loading
      contatos.forEach(c => {
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
    })
    .catch(err => {
      console.error(err);
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar contatos</td></tr>`;
    });
}

// 🔹 Chamar funções ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  carregarClientes();
  carregarContatos();
});


// Função genérica de busca
function filtrarTabela(inputId, tabelaId) {
  const filtro = document.getElementById(inputId).value.toLowerCase();
  const linhas = document.querySelectorAll(`#${tabelaId} tr`);
  linhas.forEach(linha => {
    const nome = linha.cells[1]?.textContent.toLowerCase() || '';
    linha.style.display = nome.includes(filtro) ? '' : 'none';
  });
}
// Clientes
document.getElementById('inputBuscaClientes').addEventListener('keyup', () => {
  filtrarTabela('inputBuscaClientes', 'tabelaClientes');
});

// Contatos
document.getElementById('inputBuscaContatos').addEventListener('keyup', () => {
  filtrarTabela('inputBuscaContatos', 'tabelaContatos');
});



