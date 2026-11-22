CREATE DATABASE IF NOT EXISTS api_usuarios;
USE api_usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nome, email) VALUES
('Maria Silva', 'maria@email.com'),
('João Souza', 'joao@email.com'),
('Ana Costa', 'ana@email.com');