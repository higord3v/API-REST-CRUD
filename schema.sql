CREATE DATABASE mktcubos;

CREATE TABLE usuarios (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    nome_loja text NOT NULL,
    email text UNIQUE NOT NULL,
    senha text NOT NULL
);

CREATE TABLE produtos (
    id serial PRIMARY KEY,
    usuario_id integer NOT NULL,
    nome text NOT NULL,
    quantidade integer NOT NULL,
    descricao text NOT NULL,
    preco integer NOT NULL,
    categoria text,
    imagem text,
  	foreign key (usuario_id) references usuarios(id)
)



