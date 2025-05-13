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
const funcaoIntegranteDAO = require('../../model/DAO/funcao_integrante.js')

// Função para inserir uma nova função de integrante
const inserirFuncaoIntegrante = async function (funcao_integrante, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( 
                funcao_integrante.funcao == "" || funcao_integrante.funcao == null || funcao_integrante.funcao == undefined || funcao_integrante.funcao.length > 45
              )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados da função do creditado para o DAO realizar o insert no Banco de dados
                let resultFuncaoIntegrante = await funcaoIntegranteDAO.insertFuncaoIntegrante(funcao_integrante)

                if (resultFuncaoIntegrante){
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

// Função para atualizar uma função de integrante
const atualizarFuncaoIntegrante = async function (id, funcao_integrante, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if(
                funcao_integrante.funcao == "" || funcao_integrante.funcao == null      || funcao_integrante.funcao == undefined || funcao_integrante.funcao.length > 45 ||
                id                      == "" || id                      == undefined || id                      == null      || isNaN(id)
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await funcaoIntegranteDAO.selectByIdFuncaoIntegrante(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        funcao_integrante.id = id
                        let resultFuncaoIntegrante = await funcaoIntegranteDAO.updateFuncaoIntegrante(funcao_integrante)

                        if(resultFuncaoIntegrante){
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

// Função para excluir uma função de integrante
const excluirFuncaoIntegrante = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultFuncaoIntegrante = await funcaoIntegranteDAO.selectByIdFuncaoIntegrante(id)

            if(resultFuncaoIntegrante != false || typeof(resultFuncaoIntegrante) == 'object'){
                if(resultFuncaoIntegrante.length > 0){
                    let result = await funcaoIntegranteDAO.deleteFuncaoIntegrante(id)

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

// Função para retornar uma lista de funções de integrantes
const listarFuncoesIntegrantes = async function (){
    try {
        //Criando um objeto JSON
        let dadosFuncaoIntegrante = {

        }
        //Chama a função para retornar as funções dos creditados do Banco de Dados
        let resultFuncaoIntegrante = await funcaoIntegranteDAO.selectAllFuncoesIntegrantes()

        if(resultFuncaoIntegrante != false || typeof(resultFuncaoIntegrante) == 'object'){
            if(resultFuncaoIntegrante.length > 0){

                //Cria um JSON para colocar o ARRAY de funções de integrantes
                dadosFuncaoIntegrante.status = true,
                dadosFuncaoIntegrante.status_code = 200,
                dadosFuncaoIntegrante.items = resultFuncaoIntegrante.length,
                dadosFuncaoIntegrante.functions = resultFuncaoIntegrante

                return  dadosFuncaoIntegrante
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

// Função para retornar uma função de integrante pelo ID
const buscarFuncaoIntegrante = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosFuncaoIntegrante = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultFuncaoIntegrante = await funcaoIntegranteDAO.selectByIdFuncaoIntegrante(id)

            if(resultFuncaoIntegrante != false || typeof(resultFuncaoIntegrante) == 'object'){
                if(resultFuncaoIntegrante.length > 0){

                    //Cria um JSON para colocar o ARRAY de funções de creditado
                    dadosFuncaoIntegrante.status = true,
                    dadosFuncaoIntegrante.status_code = 200,
                    dadosFuncaoIntegrante.functions = resultFuncaoIntegrante

                    return  dadosFuncaoIntegrante
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
    inserirFuncaoIntegrante,
    atualizarFuncaoIntegrante,
    excluirFuncaoIntegrante,
    listarFuncoesIntegrantes,
    buscarFuncaoIntegrante
}