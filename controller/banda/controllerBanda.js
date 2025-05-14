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
const bandaDAO = require('../../model/DAO/banda.js')

// Função para inserir uma nova banda
const inserirBanda = async function (banda, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Trata os campos que podem ser nulos
            if (banda.biografia == "" || banda.biografia == null || banda.biografia == undefined) {
                banda.biografia = null
            }

            if (banda.telefone_contato == "" || banda.telefone_contato == null || banda.telefone_contato == undefined) {
                banda.telefone_contato = null
            }

            if (banda.email_contato == "" || banda.email_contato == null || banda.email_contato == undefined) {
                banda.email_contato = null
            }

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                 banda.nome_banda       == ""   || banda.nome_banda  == null || banda.nome_banda  == undefined || banda.nome_banda.length     > 45   ||
                 banda.foto_url         == ""   || banda.foto_url    == null || banda.foto_url    == undefined ||
                 banda.email_login      == ""   || banda.email_login == null || banda.email_login == undefined || banda.email_login.length    > 100  ||
                 banda.senha            == ""   || banda.senha       == null || banda.senha       == undefined || banda.senha.length          > 45   ||
                (banda.biografia        != null && banda.biografia.length        > 500)                        ||
                (banda.telefone_contato != null && banda.telefone_contato.length > 20 )                        ||
                (banda.email_contato    != null && banda.email_contato.length    > 45 )
            ) {
                return message.ERROR_REQUIRED_FIELDS // status code 400
            } else {
                // Encaminha os dados para o DAO realizar o insert
                let resultBanda = await bandaDAO.insertBanda(banda)

                if (resultBanda) {
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

// Função para atualizar uma banda
const atualizarBanda = async function (id, banda, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){


            // Trata os campos que podem ser nulos
            if (banda.biografia == "" || banda.biografia == null || banda.biografia == undefined) {
                banda.biografia = null
            }

            if (banda.telefone_contato == "" || banda.telefone_contato == null || banda.telefone_contato == undefined) {
                banda.telefone_contato = null
            }

            if (banda.email_contato == "" || banda.email_contato == null || banda.email_contato == undefined) {
                banda.email_contato = null
            }

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                 banda.nome_banda       == ""   || banda.nome_banda  == null || banda.nome_banda  == undefined || banda.nome_banda.length     > 45   ||
                 banda.foto_url         == ""   || banda.foto_url    == null || banda.foto_url    == undefined ||
                 banda.email_login      == ""   || banda.email_login == null || banda.email_login == undefined || banda.email_login.length    > 100  ||
                 banda.senha            == ""   || banda.senha       == null || banda.senha       == undefined || banda.senha.length          > 45   ||
                (banda.biografia        != null && banda.biografia.length        > 500)                        ||
                (banda.telefone_contato != null && banda.telefone_contato.length > 20 )                        ||
                (banda.email_contato    != null && banda.email_contato.length    > 45 )
            ) {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await bandaDAO.selectByIdBanda(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com s dados recebidos no corpo da requisição
                        banda.id = id
                        let resultBanda = await bandaDAO.updateBanda(banda)

                        if(resultBanda){
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

// Função para excluir uma banda
const excluirBanda = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                    let result = await bandaDAO.deleteBanda(id)

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

// Função para retornar uma lista de bandas
const listarBandas = async function (){
    try {
        //Criando um objeto JSON
        let dadosBandas = {

        }
        //Chama a função para retornar as bandas do Banco de Dados
        let resultBanda = await bandaDAO.selectAllBandas()

        if(resultBanda != false || typeof(resultBanda) == 'object'){
            if(resultBanda.length > 0){

                //Cria um JSON para colocar o ARRAY de integrantes
                dadosBandas.status = true,
                dadosBandas.status_code = 200,
                dadosBandas.items = resultBanda.length,
                dadosBandas.bands = resultBanda

                return  dadosBandas
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

// Função para retornar uma banda pelo ID
const buscarBanda = async function (id){

    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            //Criando um objeto JSON
            let dadosBandas = {}

            //Chama a função para retornar as bandas do Banco de Dados
            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){

                    //Cria um JSON para colocar o ARRAY de músicas
                    dadosBandas.status = true,
                    dadosBandas.status_code = 200,
                    dadosBandas.bands = resultBanda

                    return  dadosBandas
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
    inserirBanda,
    atualizarBanda,
    excluirBanda,
    listarBandas,
    buscarBanda
}