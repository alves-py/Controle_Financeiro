CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE transacoes(
	id SERIAL PRIMARY KEY,
  	descricao text,
  	valor INT NOT NULL,
    data TIMESTAMPTZ,
  	categoria_id INT REFERENCES categorias(id) NOT NULL,
  	usuario_id INT REFERENCES usuarios(id) NOT NULL,
  	tipo text
);

CREATE TABLE categorias (
		id SERIAL PRIMARY KEY,
  	descricao text not null
);

INSERT INTO categorias (descricao)
VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');