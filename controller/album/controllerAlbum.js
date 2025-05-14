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
const albumDAO = require('../../model/DAO/album.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerBanda = require('../banda/controllerBanda.js')

// Função para inserir um novo album
const inserirAlbum = async function (album, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                 album.titulo           == ""   || album.titulo          == null       || album.titulo          == undefined || album.titulo.length          > 45  ||
                 album.capa_url         == ""   || album.capa_url        == null       || album.capa_url        == undefined ||
                 album.data_lancamento  == ""   || album.data_lancamento == null       || album.data_lancamento == undefined || album.data_lancamento.length > 10  ||
                 album.id_banda         == ""   || album.id_banda        == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS // status code 400
            } else {
                // Encaminha os dados para o DAO realizar o insert
                let resultAlbum = await albumDAO.insertAlbum(album)

                if (resultAlbum) {
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

// Função para atualizar um album
const atualizarAlbum = async function (id, album, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){

            // Validação dos campos obrigatórios e limites de tamanho
            if (
                album.titulo           == ""   || album.titulo          == null       || album.titulo          == undefined || album.titulo.length          > 45  ||
                album.capa_url         == ""   || album.capa_url        == null       || album.capa_url        == undefined ||
                album.data_lancamento  == ""   || album.data_lancamento == null       || album.data_lancamento == undefined || album.data_lancamento.length > 10  ||
                album.id_banda         == ""   || album.id_banda        == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await albumDAO.selectByIdAlbum(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com s dados recebidos no corpo da requisição
                        album.id = id
                        let resultAlbum = await albumDAO.updateAlbum(album)

                        if(resultAlbum){
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

// Função para excluir um album
const excluirAlbum = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                    let result = await albumDAO.deleteAlbum(id)

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

// Função para retornar uma lista de albuns
const listarAlbuns = async function (){
    try {
        let arrayAlbuns = []

        //Criando um objeto JSON
        let dadosAlbuns = {}

        //Chama a função para retornar as bandas do Banco de Dados
        let resultAlbum = await albumDAO.selectAllAlbuns()

        if(resultAlbum != false || typeof(resultAlbum) == 'object'){
            if(resultAlbum.length > 0){

                //Cria um JSON para colocar o ARRAY de integrantes
                dadosAlbuns.status = true,
                dadosAlbuns.status_code = 200,
                dadosAlbuns.items = resultAlbum.length

                for(const itemAlbum of resultAlbum){
                    let dadosBanda = await controllerBanda.buscarBanda(itemAlbum.id_banda)
                    itemAlbum.banda = dadosBanda.bands
                    delete itemAlbum.id_banda

                    arrayAlbuns.push(itemAlbum)
                }

                dadosAlbuns.albuns = arrayAlbuns

                return dadosAlbuns
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

// Função para retornar um album pelo ID
const buscarAlbum = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let arrayAlbuns = []

            //Criando um objeto JSON
            let dadosAlbuns = {}

            //Chama a função para retornar os albuns do Banco de Dados
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){

                //Cria um JSON para colocar o ARRAY de integrantes
                dadosAlbuns.status = true,
                dadosAlbuns.status_code = 200,
                dadosAlbuns.items = resultAlbum.length

                for(const itemAlbum of resultAlbum){

                    let dadosBanda = await controllerBanda.buscarBanda(itemAlbum.id_banda)
                    itemAlbum.banda = dadosBanda.nome_banda
                    delete itemAlbum.id_banda

                    arrayAlbuns.push(itemAlbum)
                }

                dadosAlbuns.albuns = arrayAlbuns

                return  dadosAlbuns
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
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbuns,
    buscarAlbum
}