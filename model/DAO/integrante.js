/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de integrante no Banco de dados
* Data: 11/02/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo integrante
const insertIntegrante = async function(integrante){
    try {
      let sql = `insert into tbl_integrantes (
                                          nome_verdadeiro,
                                          nome_artistico, 
                                          biografia
                                        )
                values                 ( 
                                          '${integrante.nome_verdadeiro}',
                                          '${integrante.nome_artistico}',
                                          '${integrante.biografia}'
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

//Função para atualizar um integrante já existente
const updateIntegrante = async function(integrante){
  try {
    let sql = `update tbl_integrantes set  nome_verdadeiro   = '${integrante.nome_verdadeiro}',
                                          nome_artistico    = '${integrante.nome_artistico}', 
                                          biografia         = '${integrante.biografia}' 
                                  where id_integrante = ${integrante.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir um integrante já existente
const deleteIntegrante = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_integrantes where id_integrante = ${id}`

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

//Função para retornar todos os integrantes do BD
const selectAllIntegrantes = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_integrantes order by id_integrante desc'

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

//Função para buscar um integrantes pelo ID
const selectByIdIntegrante = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_integrantes where id_integrante = ${id}`

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
    insertIntegrante,
    updateIntegrante,
    deleteIntegrante,
    selectAllIntegrantes,
    selectByIdIntegrante
}