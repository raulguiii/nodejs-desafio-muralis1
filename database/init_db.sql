CREATE DATABASE IF NOT EXISTS desafio_muralis;
USE desafio_muralis;

-- Tabela de Clientes
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  data_nascimento DATE NOT NULL,
  endereco VARCHAR(200) NOT NULL
);

-- Tabela de Contatos
CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  tipo ENUM('Telefone', 'Email', 'WhatsApp', "Outro") NOT NULL,
  valor VARCHAR(100) NOT NULL,
  observacao VARCHAR(255),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);