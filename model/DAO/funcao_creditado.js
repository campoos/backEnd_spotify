/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de funções do creditado no Banco de dados
* Data: 15/04/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova função do creditado
const insertFuncaoCreditado = async function(funcao_creditado){
    try {
      let sql = `insert into tbl_funcoes_creditados (
                                          funcao
                                        )
                values                 ( 
                                          '${funcao_creditado.funcao}'
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

//Função para atualizar uma função de creditado já existente
const updateFuncaoCreditado = async function(funcao_creditado){
  try {
    let sql = `update tbl_funcoes_creditados set      funcao            = '${funcao_creditado.funcao}'
                                  where id_funcao_creditado = ${funcao_creditado.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir uma função de creditado já existente
const deleteFuncaoCreditado = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_funcoes_creditados where id_funcao_creditado = ${id}`

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

//Função para retornar todas as funções dos creditados do BD
const selectAllFuncoesCreditados = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_funcoes_creditados order by id_funcao_creditado desc'

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

//Função para buscar uma função de creditado pelo ID
const selectByIdFuncaoCreditado = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_funcoes_creditados where id_funcao_creditado = ${id}`

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
    insertFuncaoCreditado,
    updateFuncaoCreditado,
    deleteFuncaoCreditado,
    selectAllFuncoesCreditados,
    selectByIdFuncaoCreditado
}