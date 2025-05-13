/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de banda no Banco de dados
* Data: 11/02/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova banda
const insertBanda = async function(banda){
    try {
      let sql = `insert into tbl_bandas (
                                          nome_banda,
                                          foto_url, 
                                          biografia, 
                                          email_login, 
                                          senha,
                                          telefone_contato,
                                          email_contato
                                        )
                values                 ( 
                                          '${banda.nome_banda}',
                                          '${banda.foto_url}',
                                          '${banda.biografia}', 
                                          '${banda.email_login}', 
                                          '${banda.senha}',
                                          '${banda.telefone_contato}',
                                          '${banda.email_contato}'
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

//Função para atualizar uma banda já existente
const updateBanda = async function(banda){
  try {
    let sql = `update tbl_bandas set      nome_banda         = '${banda.nome_banda}',
                                          foto_url           = '${banda.foto_url}', 
                                          biografia          = '${banda.biografia}', 
                                          email_login        = '${banda.email_login}', 
                                          senha              = '${banda.senha}',
                                          telefone_contato   = '${banda.telefone_contato}',
                                          email_contato      = '${banda.email_contato}'
                                  where id_banda = ${banda.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir uma banda já existente
const deleteBanda = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_bandas where id_banda = ${id}`

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

//Função para retornar todas as bandas do BD
const selectAllBandas = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_bandas order by id_banda desc'

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

//Função para buscar uma banda pelo ID
const selectByIdBanda = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_bandas where id_banda = ${id}`

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
    insertBanda,
    updateBanda,
    deleteBanda,
    selectAllBandas,
    selectByIdBanda
}