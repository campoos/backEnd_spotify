/******************************8**********************************************************
* Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de dados),
*           Validações, tratamentos de dados, etc.:
* Data: 11/02/2025
* Autor: João
* Versão: 1.0
*****************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no Banco de dados
const usuarioDAO = require('../../model/DAO/usuario.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerCurtida = require('../curtida/controllerCurtida.js')

// Função para inserir um novo usuário
const inserirUsuario = async function (usuario, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Trata os campos que podem ser nulos
            if (usuario.foto_url == "" || usuario.foto_url == null || usuario.foto_url == undefined) {
                usuario.foto_url = null
            }

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                usuario.nickname        == ""   || usuario.nickname        == null || usuario.nickname        == undefined || usuario.nickname.length        > 45  ||
                usuario.email           == ""   || usuario.email           == null || usuario.email           == undefined || usuario.email.length           > 100 ||
                usuario.senha           == ""   || usuario.senha           == null || usuario.senha           == undefined || usuario.senha.length           > 45  ||
                usuario.data_cadastro   == ""   || usuario.data_cadastro   == null || usuario.data_cadastro   == undefined || usuario.data_cadastro.length   > 10  || isNaN(Date.parse(usuario.data_cadastro))   ||
                usuario.data_nascimento == ""   || usuario.data_nascimento == null || usuario.data_nascimento == undefined || usuario.data_nascimento.length > 10  || isNaN(Date.parse(usuario.data_nascimento))
            ){
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados do usuario para o DAO realizar o insert no Banco de dados
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if (resultUsuario){
                    return message.SUCESS_CREATED_ITEM //201
                }else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para atualizar um usuario
const atualizarUsuario = async function (id, usuario, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Trata os campos que podem ser nulos
            if (usuario.foto_url == "" || usuario.foto_url == null || usuario.foto_url == undefined) {
                usuario.foto_url = null
            }

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                usuario.nickname        == ""   || usuario.nickname        == null || usuario.nickname        == undefined || usuario.nickname.length        > 45  ||
                usuario.email           == ""   || usuario.email           == null || usuario.email           == undefined || usuario.email.length           > 100 ||
                usuario.senha           == ""   || usuario.senha           == null || usuario.senha           == undefined || usuario.senha.length           > 45  ||
                usuario.data_cadastro   == ""   || usuario.data_cadastro   == null || usuario.data_cadastro   == undefined || usuario.data_cadastro.length   > 10  || isNaN(Date.parse(usuario.data_cadastro))   ||
                usuario.data_nascimento == ""   || usuario.data_nascimento == null || usuario.data_nascimento == undefined || usuario.data_nascimento.length > 10  || isNaN(Date.parse(usuario.data_nascimento))
            ){
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await usuarioDAO.selectByIdUsuario(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        usuario.id = id
                        let resultUsuario = await usuarioDAO.updateUsuario(usuario)

                        if(resultUsuario){
                            return message.SUCESS_UPDATED_ITEM //200
                        }else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }
            }
        }else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para excluir um usuario
const excluirUsuario = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    let result = await usuarioDAO.deleteUsuario(id)

                    if (result){
                        return message.SUCESS_DELETED_ITEM //200
                    }else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else {
                    return message.ERROR_NOT_FOUND //404
                }
            }else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para retornar uma lista de usuarios
const listarUsuarios = async function (){
    try {
        let arrayUsuarios = []
        //Criando um objeto JSON
        let dadosUsuario = {

        }
        //Chama a função para retornar as músicas do Banco de Dados
        let resultUsuario = await usuarioDAO.selectAllUsuarios()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){

                //Cria um JSON para colocar o ARRAY de músicas
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.items = resultUsuario.length
    
                for(const itemUsuario of resultUsuario){
                    let dadosMusica = await controllerCurtida.getMusicasPeloUsuario(itemUsuario.id_usuario)
                    itemUsuario.curtidas = dadosMusica.musicas

                    arrayUsuarios.push(itemUsuario)
                }

                dadosUsuario.usuarios = arrayUsuarios
                return  dadosUsuario
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para retornar um usuario pelo ID
const buscarUsuario = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosUsuario = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){

                    //Cria um JSON para colocar o ARRAY de músicas
                    dadosUsuario.status = true,
                    dadosUsuario.status_code = 200,
                    dadosUsuario.users = resultUsuario

                    return  dadosUsuario
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para retornar um usuario pelo ID
const buscarUsuarioLogin = async function (dados){
    try {
        if ( dados.email == ""   || dados.email == null || dados.email == undefined || dados.email.length > 100 ||
             dados.senha == ""   || dados.senha == null || dados.senha == undefined || dados.senha.length > 45){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosUsuario = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultUsuario = await usuarioDAO.loginUsuario(dados)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){

                    //Cria um JSON para colocar o ARRAY de músicas
                    dadosUsuario.status = true,
                    dadosUsuario.status_code = 200,
                    dadosUsuario.users = resultUsuario

                    return  dadosUsuario
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuarios,
    buscarUsuario,
    buscarUsuarioLogin
}