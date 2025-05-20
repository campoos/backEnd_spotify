/*******************************************************************
* Objetivo: Criar o CRUD de dados da tabela de usuario no Banco de dados
* Data: 11/02/2025
* Autor: João
* Versão: 1.0
********************************************************************/


//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo usuario
const insertUsuario = async function(usuario){
    try {
      let sql = `insert into tbl_usuarios (
                                          nickname,
                                          foto_url, 
                                          email, 
                                          senha, 
                                          data_cadastro,
                                          data_nascimento
                                        )
                values                 ( 
                                          '${usuario.nickname}',
                                          '${usuario.foto_url}',
                                          '${usuario.email}', 
                                          '${usuario.senha}', 
                                          '${usuario.data_cadastro}',
                                          '${usuario.data_nascimento}'
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

//Função para atualizar um usuario ja existente
const updateUsuario = async function(usuario){
  try {
    let sql = `update tbl_usuarios set    nickname        = '${usuario.nickname}',
                                          foto_url        = '${usuario.foto_url}',
                                          email           = '${usuario.email}', 
                                          senha           = '${usuario.senha}', 
                                          data_cadastro   = '${usuario.data_cadastro}',
                                          data_nascimento = '${usuario.data_nascimento}'               
                                  where id_usuario = ${usuario.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir um usuario já existente
const deleteUsuario = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_usuarios where id_usuario = ${id}`

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

//Função para retornar todos os usuarios do BD
const selectAllUsuarios = async function(){
    try {

      //Script SQL
      let sql = 'select * from tbl_usuarios order by id_usuario desc'

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

//Função para buscar um usuario pelo ID
const selectByIdUsuario = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_usuarios where id_usuario = ${id}`

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

//Função para buscar um usuario pelo email e senha
const loginUsuario = async function(dados){
  try {
    //Script SQL
    let sql = `select * from tbl_usuarios where email = '${dados.email}' and senha = '${dados.senha}'`

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectByIdUsuario,
    loginUsuario
}