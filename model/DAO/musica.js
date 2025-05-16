/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de música no Banco de dados
* Data: 11/02/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova música
const insertMusica = async function(musica){

    try {
      let sql = `insert into tbl_musica (
                                          nome,
                                          duracao, 
                                          data_lancamento, 
                                          letra, 
                                          link,
                                          id_album
                                        )
                values                 ( 
                                          '${musica.nome}',
                                          '${musica.duracao}',
                                          '${musica.data_lancamento}', 
                                          '${musica.letra}', 
                                          '${musica.link}',
                                          '${musica.id_album}'
                                        )`

      //Executa o script SQL no bancod e dados e aguarda o resultado final (true ou false)
      let result = await prisma.$executeRawUnsafe(sql)

      if (result)
          return true
      else
          return false //Bug no Banco de Dados

    } catch (error){
      return false //Bug de programação
    }
  
}

//Função para atualizar uma música já existente
const updateMusica = async function(musica){
  try {
    let sql = `update tbl_musica set      nome            = '${musica.nome}',
                                          duracao         = '${musica.duracao}', 
                                          data_lancamento = '${musica.data_lancamento}', 
                                          letra           = '${musica.letra}', 
                                          link            = '${musica.link}',
                                          id_album        = '${musica.id_album}'
                                  where id_musica = ${musica.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir uma música já existente
const deleteMusica = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_musica where id_musica = ${id}`

    //Encaminha o script SQL para o Banco de Dados
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
      return true //Retorna true caso tenha dado certo
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todas as musicas do BD
const selectAllMusica = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_musica order by id_musica desc'

      //Encaminha o script SQL para o Banco de Dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result //Retorna os dados do banco
      else 
        return false
    } catch (error) {
      return false
    }
}

//Função para buscar uma música pelo ID
const selectByIdMusica = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_musica where id_musica = ${id}`

    //Encaminha o script SQL para o Banco de Dados
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result //Retorna os dados do banco
    else 
      return false
  } catch (error) {
    return false
  }
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}