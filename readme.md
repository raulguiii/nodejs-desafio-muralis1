
# 🗂️ Sistema de Gestão de Clientes e Contatos

Aplicação web para **cadastrar, buscar, visualizar e gerenciar clientes e seus contatos** de forma rápida e intuitiva.

---

## 🚀 Tecnologias Utilizadas
- **Back-end:** Node.js, Express, MySQL
- **Front-end:** HTML, CSS, Bootstrap, JavaScript
- **Banco de Dados:** MySQL
- **Outros:** Git, npm

---

## ⚡ Instalação e Configuração

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/raulguiii/nodejs-desafio-muralis1.git
```

### 2️⃣ Entrar na pasta do projeto
```bash
cd nodejs-desafio-muralis1
```

### 3️⃣ Instalar dependências
```bash
npm install
```

### 4️⃣ Configurar o banco de dados
- Crie um banco de dados MySQL local (por exemplo, `desafio_muralis`).  
- No arquivo `db.js`, **configure as credenciais corretas** (host, usuário, senha e nome do banco) para que a aplicação consiga se conectar ao MySQL.  
- O projeto já contém um arquivo `init_db.sql` que possui **toda a estrutura do banco de dados**.

⚠️ **Observação importante:** Sempre revise as credenciais do banco antes de rodar o servidor para evitar erros de conexão.



### 5️⃣ Rodar o servidor
```bash
node backend/server.js
```

O sistema estará disponível em:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 Funcionalidades
✅ **Clientes**
- Listar clientes
- Buscar clientes por nome
- Cadastrar, editar e excluir clientes
- Paginação (5 registros por página)

✅ **Contatos**
- Listar contatos vinculados a cada cliente
- Buscar contatos por nome
- Cadastrar, editar e excluir contatos
- Paginação (5 registros por página)

✅ **Extras**
- Busca rápida nas tabelas
- Interface simples e intuitiva

---

## 🖥️ Como Usar

1. Após iniciar o servidor, acesse: [http://localhost:3000](http://localhost:3000)
2. No **Painel de Controle**, você pode:
   - Visualizar as tabelas de **Clientes** e **Contatos**.
   - Usar a **busca por nome** para encontrar clientes rapidamente.
   - Navegar com a **paginação** (5 registros por página).
3. **Cadastrar Cliente:**
   - Informe **Nome**, **CPF**, **Data de Nascimento** e **Endereço**.
   - O sistema gera um **ID** automaticamente.
4. **Editar ou Excluir Cliente:**
   - Localize o **ID** do cliente na tabela.
   - Informe o ID no campo solicitado e siga as instruções para editar ou excluir.
5. **Gerenciar Contatos:**
   - Para cadastrar um contato, informe o **ID do cliente** ao qual ele pertence.
   - Preencha **Tipo**, **Contato** e **Observação**.
   - Para editar ou excluir, informe o **ID do contato**.

---

## 💡 Observações
Este projeto foi desenvolvido em **Node.js** em vez de **Java**, pois o autor **não possui familiaridade com Java**.  
A escolha do Node.js permitiu maior agilidade no desenvolvimento e melhor aproveitamento do conhecimento prévio em JavaScript.

## 👨‍💻 Autor
**Raul Guilherme**  
🔗 [GitHub](https://github.com/raulguiii)