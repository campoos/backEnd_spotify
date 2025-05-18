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

//Função para inserir um novo genero_banda
const insertGeneroBanda = async function(generoBanda){
  try {

      let sql = `insert into tbl_generos_bandas  ( 
                                          id_genero,
                                          id_banda
                                        ) 
                                          values 
                                        (
                                          ${generoBanda.id_genero},
                                          ${generoBanda.id_banda}
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

//Função para atualizar um genero_banda existente
const updateGeneroBanda = async function(generoBanda){
  try {
      let sql = `update tbl_generos_bandas set      id_genero      = ${generoMusica.id_genero},
                                                    id_musica      = ${generoMusica.id_musica}
                                        
                            where id_genero_banda = ${generoMusica.id}                
                            `
      let resultGeneroBanda = await prisma.$executeRawUnsafe(sql)

      if(resultGeneroBanda)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um genero_banda existente
const deleteGeneroBanda = async function(id){
  try {
    let sql = `delete from tbl_generos_bandas where id_genero_banda = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para excluir um genero_banda existente pelo id da banda
const deleteGeneroBandaByIdBanda = async function(id){
  try {
    let sql = `delete from tbl_generos_bandas where id_banda = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os generos_bandas existentes
const selectAllGenerosBandas = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_generos_bandas order by id desc'

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

//Função para buscar um genero_banda pelo ID
const selectByIdGeneroBanda = async function(id){
  try {
    let sql = `select * from tbl_generos_bandas where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar as bandas pelo genero
const selectBandasByIdGenero = async function(idGenero){
  try {
      let sql = `select tbl_bandas.* from tbl_bandas 
                                            inner join tbl_generos_bandas
                                              on tbl_bandas.id_banda = tbl_generos_bandas.id_banda
                                            inner join tbl_generos
                                              on tbl_generos.id_genero = tbl_generos_bandas.id_genero
                  where tbl_generos_bandas.id_genero = ${idGenero}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pela banda
const selectGeneroByIdBanda = async function(idBanda){
 try {
      let sql = `select tbl_generos.* from tbl_bandas 
                                            inner join tbl_generos_bandas
                                              on tbl_bandas.id_banda = tbl_generos_bandas.id_banda
                                            inner join tbl_generos
                                              on tbl_generos.id_genero = tbl_generos_bandas.id_genero
                  where tbl_generos_bandas.id_banda = ${idBanda}`
                  
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
    insertGeneroBanda,
    updateGeneroBanda,
    deleteGeneroBanda,
    deleteGeneroBandaByIdBanda,
    selectAllGenerosBandas,
    selectByIdGeneroBanda,
    selectBandasByIdGenero,
    selectGeneroByIdBanda
} 