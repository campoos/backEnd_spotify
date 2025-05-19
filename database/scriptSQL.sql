show databases;

use db_controle_musicas_aa;

show tables;

create table tbl_musica(
	id_musica 					int not null primary key auto_increment,
    nome 				varchar(100) not null,
    duracao 			time not null,
    data_lancamento 	date not null,
    letra 				text,
    link 				varchar(200),
	capa_url 			text not null,
	id_album 			int not null,

	constraint fk_musicas_albuns
	foreign key (id_album)
	references tbl_albuns(id_album)	
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

create table tbl_generos_musicas (
	id_genero_musica int not null primary key auto_increment,
	id_genero int not null,
	id_musica int not null,
	constraint fk_generos_musicas
	foreign key (id_genero)
	references tbl_generos(id_genero),	
    
    constraint fk_musicas_generos
    foreign key (id_musica)
    references tbl_musica(id_musica)
);

create table tbl_generos_bandas (
	id_genero_banda int not null primary key auto_increment,
	id_genero int not null,
	id_banda int not null,
	constraint fk_generos_bandas
	foreign key (id_genero)
	references tbl_generos(id_genero),	
    
    constraint fk_bandas_generos
    foreign key (id_banda)
    references tbl_bandas(id_banda)
);

create table tbl_musicas_bandas (
	id_musica_banda int not null primary key auto_increment,
	id_musica int not null,
	id_banda int not null,
	constraint fk_musicas_bandas
	foreign key (id_musica)
	references tbl_musica(id_musica),	
    
    constraint fk_bandas_musicas
    foreign key (id_banda)
    references tbl_bandas(id_banda)
);

show tables;

drop table tbl_teste;

select * from tbl_musica;