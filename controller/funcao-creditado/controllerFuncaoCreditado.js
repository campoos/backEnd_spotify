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
const funcaoCreditadoDAO = require('../../model/DAO/funcao_creditado.js')

// Função para inserir uma nova função de creditado
const inserirFuncaoCreditado = async function (funcao_creditado, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( 
                funcao_creditado.funcao == "" || funcao_creditado.funcao == null || funcao_creditado.funcao == undefined || funcao_creditado.funcao.length > 100
              )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados da função do creditado para o DAO realizar o insert no Banco de dados
                let resultFuncaoCreditado = await funcaoCreditadoDAO.insertFuncaoCreditado(funcao_creditado)

                if (resultFuncaoCreditado){
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

// Função para atualizar uma função de creditado
const atualizarFuncaoCreditado = async function (id, funcao_creditado, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if(
                funcao_creditado.funcao == "" || funcao_creditado.funcao == null      || funcao_creditado.funcao == undefined || funcao_creditado.funcao.length > 100 ||
                id                      == "" || id                      == undefined || id                      == null      || isNaN(id)
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await funcaoCreditadoDAO.selectByIdFuncaoCreditado(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        funcao_creditado.id = id
                        let resultFuncaoCreditado = await funcaoCreditadoDAO.updateFuncaoCreditado(funcao_creditado)

                        if(resultFuncaoCreditado){
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

// Função para excluir uma função de creditado
const excluirFuncaoCreditado = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultFuncaoCreditado = await funcaoCreditadoDAO.selectByIdFuncaoCreditado(id)

            if(resultFuncaoCreditado != false || typeof(resultFuncaoCreditado) == 'object'){
                if(resultFuncaoCreditado.length > 0){
                    let result = await funcaoCreditadoDAO.deleteFuncaoCreditado(id)

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

// Função para retornar uma lista de funções de creditados
const listarFuncoesCreditados = async function (){
    try {
        //Criando um objeto JSON
        let dadosFuncaoCreditado = {

        }
        //Chama a função para retornar as funções dos creditados do Banco de Dados
        let resultFuncaoCreditado = await funcaoCreditadoDAO.selectAllFuncoesCreditados()

        if(resultFuncaoCreditado != false || typeof(resultFuncaoCreditado) == 'object'){
            if(resultFuncaoCreditado.length > 0){

                //Cria um JSON para colocar o ARRAY de funções de creditados
                dadosFuncaoCreditado.status = true,
                dadosFuncaoCreditado.status_code = 200,
                dadosFuncaoCreditado.items = resultFuncaoCreditado.length,
                dadosFuncaoCreditado.functions = resultFuncaoCreditado

                return  dadosFuncaoCreditado
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

// Função para retornar uma função de creditado pelo ID
const buscarFuncaoCreditado = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosFuncaoCreditado = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultFuncaoCreditado = await funcaoCreditadoDAO.selectByIdFuncaoCreditado(id)

            if(resultFuncaoCreditado != false || typeof(resultFuncaoCreditado) == 'object'){
                if(resultFuncaoCreditado.length > 0){

                    //Cria um JSON para colocar o ARRAY de funções de creditado
                    dadosFuncaoCreditado.status = true,
                    dadosFuncaoCreditado.status_code = 200,
                    dadosFuncaoCreditado.functions = resultFuncaoCreditado

                    return  dadosFuncaoCreditado
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
    inserirFuncaoCreditado,
    atualizarFuncaoCreditado,
    excluirFuncaoCreditado,
    listarFuncoesCreditados,
    buscarFuncaoCreditado
}