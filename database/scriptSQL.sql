show databases;

use db_controle_musicas_aa;

show tables;

create table tbl_musica(
	id_musica 					int not null primary key auto_increment,
    nome 				varchar(100) not null,
    duracao 			time not null,
    data_lancamento 	date not null,
    letra 				text,
    link 				varchar(200)
);

create table tbl_funcoes_creditados (
	id_funcao_creditado int not null primary key auto_increment,
	funcao varchar(100) not null
);

create table tbl_creditados (
	id_creditado int not null primary key auto_increment,
	nome_creditado varchar(100) not null
);

create table tbl_idiomas (
	id_idioma int not null primary key auto_increment,
	nome_idioma varchar(100) not null
);

create table tbl_usuarios (
	id_usuario int not null primary key auto_increment,
	nickname varchar(100) not null,
	foto_url text,
	email varchar(100) not null,
	senha varchar(100) not null,
	data_cadastro date not null,
	data_nascimento date not null
);

create table tbl_generos (
	id_genero int not null primary key auto_increment,
	nome_genero varchar(100) not null
);

create table tbl_bandas (
	id_banda int not null primary key auto_increment,
	nome_banda varchar(100) not null,
	foto_url text not null,
	biografia varchar(500),
	email_login varchar(100) not null,
	senha varchar(100) not null,
	telefone_contato varchar(20),
	email_contato varchar(100)
);

create table tbl_funcoes_integrantes (
	id_funcao_integrante int not null primary key auto_increment,
	funcao varchar(100) not null
);

create table tbl_integrantes (
	id_integrante int not null primary key auto_increment,
	nome_verdadeiro varchar(100),
	nome_artistico varchar(100) not null,
	biografia varchar(500)
);

create table tbl_albuns (
	id_album int not null primary key auto_increment,
	titulo varchar(45) not null,
	capa_url text not null,
	data_lancamento date not null,
	id_banda int not null,
	constraint fk_albuns_bandas
	foreign key (id_banda)
	references tbl_bandas(id_banda)	
);

show tables;

drop table tbl_teste;

select * from tbl_musica;