/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de generos_bandas
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir uma nova musica_banda
const insertMusicaBanda = async function(musicaBanda){
  try {

      let sql = `insert into tbl_musicas_bandas  ( 
                                          id_musica,
                                          id_banda
                                        ) 
                                          values 
                                        (
                                          ${musicaBanda.id_musica},
                                          ${musicaBanda.id_banda}
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

//Função para atualizar uma musica_banda existente
const updateMusicaBanda = async function(musicaBanda){
  try {
      let sql = `update tbl_musicas_bandas set      id_musica      = ${musicaBanda.id_musica},
                                                    id_banda       = ${musicaBanda.id_banda}
                                        
                            where id_musica_banda = ${musicaBanda.id}                
                            `
      let resultMusicaBanda = await prisma.$executeRawUnsafe(sql)

      if(resultMusicaBanda)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir uma musica_banda existente
const deleteMusicaBanda = async function(id){
  try {
    let sql = `delete from tbl_musicas_bandas where id_musica_banda = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para excluir uma musica_banda existente pelo id da banda
const deleteMusicaBandaByIdBanda = async function(id){
  try {
    let sql = `delete from tbl_musicas_bandas where id_banda = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para excluir uma musica_banda existente pelo id da musica
const deleteMusicaBandaByIdMusica = async function(id){
  try {
    let sql = `delete from tbl_musicas_bandas where id_musica = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todas as musicas_bandas existentes
const selectAllMusicasBandas = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_musicas_bandas order by id desc'

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

//Função para buscar uma musica_banda pelo ID
const selectByIdMusicaBanda = async function(id){
  try {
    let sql = `select * from tbl_musicas_bandas where id_musica_banda = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar as bandas pela musica
const selectBandasByIdMusica = async function(idMusica){
  try {
      let sql = `select tbl_bandas.* from tbl_bandas 
                                            inner join tbl_musicas_bandas
                                              on tbl_bandas.id_banda = tbl_musicas_bandas.id_banda
                                            inner join tbl_musica
                                              on tbl_musica.id_musica = tbl_musicas_bandas.id_musica
                  where tbl_musicas_bandas.id_musica = ${idMusica}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar as musicas pela banda
const selectMusicaByIdBanda = async function(idBanda){
 try {
      let sql = `select tbl_musica.* from tbl_bandas 
                                            inner join tbl_musicas_bandas
                                              on tbl_bandas.id_banda = tbl_musicas_bandas.id_banda
                                            inner join tbl_musica
                                              on tbl_musica.id_musica = tbl_musicas_bandas.id_musica
                  where tbl_musicas_bandas.id_banda = ${idBanda}`
                  
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
    insertMusicaBanda,
    updateMusicaBanda,
    deleteMusicaBanda,
    deleteMusicaBandaByIdBanda,
    deleteMusicaBandaByIdMusica,
    selectAllMusicasBandas,
    selectByIdMusicaBanda,
    selectBandasByIdMusica,
    selectMusicaByIdBanda
} 