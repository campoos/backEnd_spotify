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
const generoDAO = require('../../model/DAO/genero.js')

// Função para inserir um novo genero
const inserirGenero = async function (genero, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( 
                genero.nome_genero == "" || genero.nome_genero == null || genero.nome_genero == undefined || genero.nome_genero > 45
              )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados do idioma para o DAO realizar o insert no Banco de dados
                let resultGenero = await generoDAO.insertGenero(genero)

                if (resultGenero){
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

// Função para atualizar um genero
const atualizarGenero = async function (id, genero, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if(
                genero.nome_genero == "" || genero.nome_genero == null      || genero.nome_genero == undefined || genero.nome_genero.length > 45 ||
                id                 == "" || id                 == undefined || id                 == null      || isNaN(id)
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await generoDAO.selectByIdGenero(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        genero.id = id
                        let resultGenero = await generoDAO.updateGenero(genero)

                        if(resultGenero){
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

// Função para excluir um genero
const exlcuirGenero = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    let result = await generoDAO.deleteGenero(id)

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

// Função para retornar uma lista de generos
const listarGeneros = async function (){
    try {
        //Criando um objeto JSON
        let dadosGeneros = {

        }
        //Chama a função para retornar os generos do Banco de Dados
        let resultGenero = await generoDAO.selectAllGeneros()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){

                //Cria um JSON para colocar o ARRAY de generos
                dadosGeneros.status = true,
                dadosGeneros.status_code = 200,
                dadosGeneros.items = resultGenero.length,
                dadosGeneros.genres = resultGenero

                return  dadosGeneros
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

// Função para retornar um genero pelo ID
const buscarGenero = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosGeneros = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){

                    //Cria um JSON para colocar o ARRAY de funções de creditado
                    dadosGeneros.status = true,
                    dadosGeneros.status_code = 200,
                    dadosGeneros.genres = resultGenero

                    return  dadosGeneros
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
    inserirGenero,
    atualizarGenero,
    exlcuirGenero,
    listarGeneros,
    buscarGenero
}