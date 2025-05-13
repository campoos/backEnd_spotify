/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de funções do integrante no Banco de dados
* Data: 15/04/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova função do integrante
const insertFuncaoIntegrante = async function(funcao_integrante){
    try {
      let sql = `insert into tbl_funcoes_integrantes (
                                          funcao
                                        )
                values                 ( 
                                          '${funcao_integrante.funcao}'
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

//Função para atualizar uma função de integrante já existente
const updateFuncaoIntegrante = async function(funcao_integrante){
  try {
    let sql = `update tbl_funcoes_integrantes set      funcao            = '${funcao_integrante.funcao}'
                                  where id_funcao_integrante = ${funcao_integrante.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir uma função de integrante já existente
const deleteFuncaoIntegrante = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_funcoes_integrantes where id_funcao_integrante = ${id}`

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

//Função para retornar todas as funções dos integrantes do BD
const selectAllFuncoesIntegrantes = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_funcoes_integrantes order by id_funcao_integrante desc'

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

//Função para buscar uma função de integrante pelo ID
const selectByIdFuncaoIntegrante = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_funcoes_integrantes where id_funcao_integrante = ${id}`

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
    insertFuncaoIntegrante,
    updateFuncaoIntegrante,
    deleteFuncaoIntegrante,
    selectAllFuncoesIntegrantes,
    selectByIdFuncaoIntegrante
}