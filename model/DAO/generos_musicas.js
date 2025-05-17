/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de generos_musicas
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo genero_musica
const insertGeneroMusica = async function(generoMusica){
  try {

      let sql = `insert into tbl_generos_musicas  ( 
                                          id_genero,
                                          id_musica
                                        ) 
                                          values 
                                        (
                                          ${generoMusica.id_genero},
                                          ${generoMusica.id_musica}
                                        )`

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um genero_musica existente
const updateGeneroMusica = async function(generoMusica){
  try {
      let sql = `update tbl_generos_musicas set     id_genero      = ${generoMusica.id_genero},
                                                    id_musica      = ${generoMusica.id_musica}
                                        
                            where id = ${generoMusica.id}                
                            `
      let resultGeneroMusica = await prisma.$executeRawUnsafe(sql)

      if(resultGeneroMusica)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um genero_musica existente
const deleteGeneroMusica = async function(id){
  try {
    let sql = `delete from tbl_generos_musicas where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para excluir um genero_musica existente pelo id da musica
const deleteGeneroMusicaByIdMusica = async function(id){
  try {
    let sql = `delete from tbl_generos_musicas where id_musica = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os generos_musicas existentes
const selectAllGenerosMusicas = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_generos_musicas order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um genero_musica pelo ID
const selectByIdGeneroMusica = async function(id){
  try {
    let sql = `select * from tbl_generos_musicas where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar as musicas pelo genero
const selectMusicasByIdGenero = async function(idGenero){
  try {
      let sql = `select tbl_musica.* from tbl_musica 
                                            inner join tbl_generos_musicas
                                              on tbl_musica.id_musica = tbl_generos_musicas.id_musica
                                            inner join tbl_generos
                                              on tbl_generos.id_genero = tbl_generos_musicas.id_genero
                  where tbl_generos_musicas.id_genero = ${idGenero}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pela musica
const selectGeneroByIdMusica = async function(idMusica){
 try {
      let sql = `select tbl_generos.* from tbl_musica 
                                            inner join tbl_generos_musicas
                                              on tbl_musica.id_musica = tbl_generos_musicas.id_musica
                                            inner join tbl_generos
                                              on tbl_generos.id_genero = tbl_generos_musicas.id_genero
                  where tbl_generos_musicas.id_musica = ${idMusica}`
                  
      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}


module.exports = {
    insertGeneroMusica,
    updateGeneroMusica,
    deleteGeneroMusica,
    deleteGeneroMusicaByIdMusica,
    selectAllGenerosMusicas,
    selectByIdGeneroMusica,
    selectMusicasByIdGenero,
    selectGeneroByIdMusica
} 