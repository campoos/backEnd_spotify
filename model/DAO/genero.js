/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de generos no Banco de dados
* Data: 15/04/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo genero
const insertGenero = async function(genero){
    try {
      let sql = `insert into tbl_generos (
                                          nome_genero
                                        )
                values                 ( 
                                          '${genero.nome_genero}'
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

//Função para atualizar um genero já existente
const updateGenero = async function(genero){
  try {
    let sql = `update tbl_generos set      nome_genero            = '${genero.nome_genero}'
                                  where id_genero = ${genero.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir um genero já existente
const deleteGenero = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_generos where id_genero = ${id}`

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

//Função para retornar todos os generos do BD
const selectAllGeneros = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_generos order by id_genero desc'

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

//Função para buscar um genero pelo ID
const selectByIdGenero = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_generos where id_genero = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
}