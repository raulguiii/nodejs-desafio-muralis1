document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section');
    
    // Esconde todas
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('d-none'));
    
    // Mostra a escolhida
    document.getElementById(sectionId).classList.remove('d-none');
    });
});





// Função genérica de busca
  function filtrarTabela(inputId, tabelaId) {
    const filtro = document.getElementById(inputId).value.toLowerCase();
    const linhas = document.querySelectorAll(`#${tabelaId} tr`);
    linhas.forEach(linha => {
      const nome = linha.cells[1].textContent.toLowerCase(); // coluna Nome do Cliente
      linha.style.display = nome.includes(filtro) ? '' : 'none';
    });
  }

  // Clientes
  document.getElementById('btnBuscaClientes').addEventListener('click', () => {
    const area = document.getElementById('areaBuscaClientes');
    area.style.display = area.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('inputBuscaClientes').addEventListener('keyup', () => {
    filtrarTabela('inputBuscaClientes', 'tabelaClientes');
  });

  // Contatos
  document.getElementById('btnBuscaContatos').addEventListener('click', () => {
    const area = document.getElementById('areaBuscaContatos');
    area.style.display = area.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('inputBuscaContatos').addEventListener('keyup', () => {
    filtrarTabela('inputBuscaContatos', 'tabelaContatos');
  });

