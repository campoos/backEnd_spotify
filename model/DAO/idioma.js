/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de idiomas no Banco de dados
* Data: 15/04/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo idioma
const insertIdioma = async function(idioma){
    try {
      let sql = `insert into tbl_idiomas (
                                          nome_idioma
                                        )
                values                 ( 
                                          '${idioma.nome_idioma}'
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

//Função para atualizar um idioma já existente
const updateIdioma = async function(idioma){
  try {
    let sql = `update tbl_idiomas set      nome_idioma            = '${idioma.nome_idioma}'
                                  where id_idioma = ${idioma.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir um idioma já existente
const deleteIdioma = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_idiomas where id_idioma = ${id}`

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

//Função para retornar todos os idiomas do BD
const selectAllIdiomas = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_idiomas order by id_idioma desc'

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

//Função para buscar um idioma pelo ID
const selectByIdIdioma = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_idiomas where id_idioma = ${id}`

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
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdiomas,
    selectByIdIdioma
}