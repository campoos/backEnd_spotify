/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de creditado no Banco de dados
* Data: 15/04/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo creditado
const insertCreditado = async function(creditado){
    try {
      let sql = `insert into tbl_creditados (
                                          nome_creditado
                                        )
                values                 ( 
                                          '${creditado.nome_creditado}'
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

//Função para atualizar um creditado já existente
const updateCreditado = async function(creditado){
  try {
    let sql = `update tbl_creditados set      nome_creditado            = '${creditado.nome_creditado}'
                                  where id_creditado = ${creditado.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir um creditado já existente
const deleteCreditado = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_creditados where id_creditado = ${id}`

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

//Função para retornar todos os creditados do BD
const selectAllCreditados = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_creditados order by id_creditado desc'

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

//Função para buscar um creditado pelo ID
const selectByIdCreditado = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_creditados where id_creditado = ${id}`

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
    insertCreditado,
    updateCreditado,
    deleteCreditado,
    selectAllCreditados,
    selectByIdCreditado
}