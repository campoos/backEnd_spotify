/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de curtidas
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir uma nova curtida
const insertCurtida = async function(curtida){
  try {

      let sql = `insert into tbl_curtidas  ( 
                                          data_curtida,
                                          id_usuario,
                                          id_musica
                                        ) 
                                          values 
                                        (
                                          '${curtida.data_curtida}',
                                          ${curtida.id_usuario},
                                          ${curtida.id_musica}
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

//Função para excluir uma curtida existente
const deleteCurtida = async function(id){
  try {
    let sql = `delete from tbl_curtidas where id_curtida = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para excluir uma curtida existente pelo id do usuario
const deleteCurtidaByIdUsuario = async function(id){
  try {
    let sql = `delete from tbl_curtidas where id_usuario = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para excluir uma curtida existente pelo id da musica
const deleteCurtidaByIdMusica = async function(id){
  try {
    let sql = `delete from tbl_curtidas where id_musica = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

const getCurtidasByIdUsuario = async function(id){
    try {
        let sql = `select * from tbl_curtidas where id_usuario = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma curtida pelo ID
const selectByIdCurtida = async function(id){
  try {
    let sql = `select * from tbl_curtidas where id_curtida = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}


//Função para retornar os musicas pelo usuario
const selectMusicaByIdUsuario = async function(idUsuario){
 try {
      let sql = `select tbl_musica.* from tbl_usuarios 
                                            inner join tbl_curtidas
                                              on tbl_usuarios.id_usuario = tbl_curtidas.id_usuario
                                            inner join tbl_musica
                                              on tbl_musica.id_musica = tbl_curtidas.id_musica
                  where tbl_curtidas.id_usuario = ${idUsuario}`
                  
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
    insertCurtida,
    deleteCurtida,
    deleteCurtidaByIdUsuario,
    deleteCurtidaByIdMusica,
    selectMusicaByIdUsuario,
    getCurtidasByIdUsuario,
    selectByIdCurtida
} 