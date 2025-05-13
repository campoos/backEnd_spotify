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
const integranteDAO = require('../../model/DAO/integrante.js')

// Função para inserir um novo integrante
const inserirIntegrante = async function (integrante, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Trata os campos que podem ser nulos
            if (integrante.nome_verdadeiro == "" || integrante.nome_verdadeiro == null || integrante.nome_verdadeiro == undefined) {
                integrante.nome_verdadeiro = null
            }

            if (integrante.biografia == "" || integrante.biografia == null || integrante.biografia == undefined) {
                integrante.biografia = null
            }

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                 integrante.nome_artistico  == ""   || integrante.nome_artistico == null || integrante.nome_artistico == undefined || integrante.nome_artistico.length > 45 ||
                (integrante.nome_verdadeiro != null && integrante.nome_verdadeiro.length >  45)                                    ||
                (integrante.biografia       != null && integrante.biografia.length       > 300)
            ) {
                return message.ERROR_REQUIRED_FIELDS // status code 400
            } else {
                // Encaminha os dados para o DAO realizar o insert
                let resultIntegrante = await integranteDAO.insertIntegrante(integrante)

                if (resultIntegrante) {
                    return message.SUCESS_CREATED_ITEM // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um integrante
const atualizarIntegrante = async function (id, integrante, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Trata os campos que podem ser nulos
            if (integrante.nome_verdadeiro == "" || integrante.nome_verdadeiro == null || integrante.nome_verdadeiro == undefined) {
                integrante.nome_verdadeiro = null
            }

            if (integrante.biografia == "" || integrante.biografia == null || integrante.biografia == undefined) {
                integrante.biografia = null
            }

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                 integrante.nome_artistico  == ""   || integrante.nome_artistico == null || integrante.nome_artistico == undefined || integrante.nome_artistico.length > 45 ||
                (integrante.nome_verdadeiro != null && integrante.nome_verdadeiro.length >  45)                                    ||
                (integrante.biografia       != null && integrante.biografia.length       > 300)
            ) {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await integranteDAO.selectByIdIntegrante(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com s dados recebidos no corpo da requisição
                        integrante.id = id
                        let resultIntegrante = await integranteDAO.updateIntegrante(integrante)

                        if(resultIntegrante){
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

// Função para excluir um integrante
const excluirIntegrante = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultIntegrante = await integranteDAO.selectByIdIntegrante(id)

            if(resultIntegrante != false || typeof(resultIntegrante) == 'object'){
                if(resultIntegrante.length > 0){
                    let result = await integranteDAO.deleteIntegrante(id)

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

// Função para retornar uma lista de integrantes
const listarIntegrantes = async function (){
    try {
        //Criando um objeto JSON
        let dadosIntegrante = {

        }
        //Chama a função para retornar os integrantes do Banco de Dados
        let resultIntegrante = await integranteDAO.selectAllIntegrantes()

        if(resultIntegrante != false || typeof(resultIntegrante) == 'object'){
            if(resultIntegrante.length > 0){

                //Cria um JSON para colocar o ARRAY de integrantes
                dadosIntegrante.status = true,
                dadosIntegrante.status_code = 200,
                dadosIntegrante.items = resultIntegrante.length,
                dadosIntegrante.members = resultIntegrante

                return  dadosIntegrante
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

// Função para retornar um integrante pelo ID
const buscarIntegrante = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosIntegrante = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultIntegrante = await integranteDAO.selectByIdIntegrante(id)

            if(resultIntegrante != false || typeof(resultIntegrante) == 'object'){
                if(resultIntegrante.length > 0){

                    //Cria um JSON para colocar o ARRAY de músicas
                    dadosIntegrante.status = true,
                    dadosIntegrante.status_code = 200,
                    dadosIntegrante.member = resultIntegrante

                    return  dadosIntegrante
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
    inserirIntegrante,
    atualizarIntegrante,
    excluirIntegrante,
    listarIntegrantes,
    buscarIntegrante
}