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
const idiomaDAO = require('../../model/DAO/idioma.js')

// Função para inserir um novo idioma
const inserirIdioma = async function (idioma, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( 
                idioma.nome_idioma == "" || idioma.nome_idioma == null || idioma.nome_idioma == undefined || idioma.nome_idioma > 45
              )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados do idioma para o DAO realizar o insert no Banco de dados
                let resultIdioma = await idiomaDAO.insertIdioma(idioma)

                if (resultIdioma){
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

// Função para atualizar um idioma
const atualizarIdioma = async function (id, idioma, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if(
                idioma.nome_idioma == "" || idioma.nome_idioma == null      || idioma.nome_idioma == undefined || idioma.nome_idioma.length > 45 ||
                id                 == "" || id                 == undefined || id                 == null      || isNaN(id)
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await idiomaDAO.selectByIdIdioma(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        idioma.id = id
                        let resultIdioma = await idiomaDAO.updateIdioma(idioma)

                        if(resultIdioma){
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

// Função para excluir um idioma
const excluirIdioma = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultIdioma = await idiomaDAO.selectByIdIdioma(id)

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){
                    let result = await idiomaDAO.deleteIdioma(id)

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

// Função para retornar uma lista de idiomas
const listarIdiomas = async function (){
    try {
        //Criando um objeto JSON
        let dadosIdiomas = {

        }
        //Chama a função para retornar os idiomas do Banco de Dados
        let resultIdioma = await idiomaDAO.selectAllIdiomas()

        if(resultIdioma != false || typeof(resultIdioma) == 'object'){
            if(resultIdioma.length > 0){

                //Cria um JSON para colocar o ARRAY de idiomas
                dadosIdiomas.status = true,
                dadosIdiomas.status_code = 200,
                dadosIdiomas.items = resultIdioma.length,
                dadosIdiomas.idioms = resultIdioma

                return  dadosIdiomas
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

// Função para retornar um idioma pelo ID
const buscarIdioma = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosIdiomas = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultIdioma = await idiomaDAO.selectByIdIdioma(id)

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){

                    //Cria um JSON para colocar o ARRAY de funções de creditado
                    dadosIdiomas.status = true,
                    dadosIdiomas.status_code = 200,
                    dadosIdiomas.idioms = resultIdioma

                    return  dadosIdiomas
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
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdiomas,
    buscarIdioma
}