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
const creditadoDAO = require('../../model/DAO/creditado.js')

// Função para inserir um novo creditado
const inserirCreditado = async function (creditado, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( 
                creditado.nome_creditado == "" || creditado.nome_creditado == null || creditado.nome_creditado == undefined || creditado.nome_creditado.length > 45
              )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados da função do creditado para o DAO realizar o insert no Banco de dados
                let resultCreditado = await creditadoDAO.insertCreditado(creditado)

                if (resultCreditado){
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

// Função para atualizar um creditado
const atualizarCreditado = async function (id, creditado, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if(
                creditado.nome_creditado == "" || creditado.nome_creditado == null      || creditado.nome_creditado == undefined || creditado.nome_creditado.length > 45 ||
                id                      == "" || id                      == undefined || id                      == null      || isNaN(id)
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await creditadoDAO.selectByIdCreditado(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        creditado.id = id
                        let resultCreditado = await creditadoDAO.updateCreditado(creditado)

                        if(resultCreditado){
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

// Função para excluir um creditado
const excluirCreditado = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultCreditado = await creditadoDAO.selectByIdCreditado(id)

            if(resultCreditado != false || typeof(resultCreditado) == 'object'){
                if(resultCreditado.length > 0){
                    let result = await creditadoDAO.deleteCreditado(id)

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

// Função para retornar uma lista de creditados
const listarCreditados = async function (){
    try {
        //Criando um objeto JSON
        let dadosCreditado = {

        }
        //Chama a função para retornar as funções dos creditados do Banco de Dados
        let resultCreditado = await creditadoDAO.selectAllCreditados()

        if(resultCreditado != false || typeof(resultCreditado) == 'object'){
            if(resultCreditado.length > 0){

                //Cria um JSON para colocar o ARRAY de funções de creditados
                dadosCreditado.status = true,
                dadosCreditado.status_code = 200,
                dadosCreditado.items = resultCreditado.length,
                dadosCreditado.credits = resultCreditado

                return  dadosCreditado
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

// Função para retornar um creditado pelo ID
const buscarCreditado = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosCreditado = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultCreditado = await creditadoDAO.selectByIdCreditado(id)

            if(resultCreditado != false || typeof(resultCreditado) == 'object'){
                if(resultCreditado.length > 0){

                    //Cria um JSON para colocar o ARRAY de funções de creditado
                    dadosCreditado.status = true,
                    dadosCreditado.status_code = 200,
                    dadosCreditado.credits = resultCreditado

                    return  dadosCreditado
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
    inserirCreditado,
    atualizarCreditado,
    excluirCreditado,
    listarCreditados,
    buscarCreditado
}