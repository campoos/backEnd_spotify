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
const musicaDAO = require('../../model/DAO/musica.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerGeneroMusica = require('./controllerGenerosMusicas.js')

// Função para inserir uma nova música
const inserirMusica = async function (musica, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( musica.nome            == ""       || musica.nome            == null|| musica.nome            == undefined || musica.nome.length            > 100 ||
                musica.duracao         == ""       || musica.duracao         == null|| musica.duracao         == undefined || musica.duracao.length         > 8   ||
                musica.data_lancamento == ""       || musica.data_lancamento == null|| musica.data_lancamento == undefined || musica.data_lancamento.length > 10  || 
                musica.letra           == undefined||
                musica.link            == undefined|| musica.link.length > 200      ||
                musica.capa_url        == undefined||
                musica.id_album        == ""       || musica.id_album        == undefined
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultMusica = await musicaDAO.insertMusica(musica)

                let lastIdMusica = await musicaDAO.selectLastIdMusica()
                extracaoIdLastMusica = lastIdMusica[0].id_musica

               musica.generos.forEach((item) => {
                let objeto = {
                    id_genero: item.id_genero,
                    id_musica: extracaoIdLastMusica
                }
                resultRelacao = controllerGeneroMusica.inserirGeneroMusica(objeto)
               });
                if (resultRelacao && resultMusica){
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

// Função para atualizar uma música
const atualizarMusica = async function (id, musica, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if( musica.nome            == ""       || musica.nome            == null      || musica.nome            == undefined || musica.nome.length            > 100 ||
                musica.duracao         == ""       || musica.duracao         == null      || musica.duracao         == undefined || musica.duracao.length         > 8   ||
                musica.data_lancamento == ""       || musica.data_lancamento == null      || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  || 
                musica.letra           == undefined||
                musica.link            == undefined|| musica.link.length     > 200        ||
                musica.capa_url        == undefined||
                musica.id_album        == ""       || musica.id_album        == undefined
                )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else {
                //Verifica se o ID existe no Banco de Dados
                let result = await musicaDAO.selectByIdMusica(id)

                if (result != false || typeof(result) == 'object'){
                    if (result.length > 0){
                        //update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        musica.id = id

                        await controllerGeneroMusica.excluirGeneroMusicaByIdMusica(id)

                        let resultMusica = await musicaDAO.updateMusica(musica)

                        let resultRelacao = true

                        for (const item of musica.generos) {
                            let objeto = {
                                id_genero: item.id_genero,
                                id_musica: musica.id
                            }
                  
                            let resultado = await controllerGeneroMusica.inserirGeneroMusica(objeto)
                            if (!resultado) {
                                resultRelacao = false
                                break
                            }
                        }

                        if(resultRelacao && resultMusica){
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

// Função para excluir uma música
const excluirMusica = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else {
            //Antes de excluir, estamos verificando se existe esse ID
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    let deleteRelacao = await controllerGeneroMusica.excluirGeneroMusicaByIdMusica(id)
                    let result = await musicaDAO.deleteMusica(id)

                    if (result && deleteRelacao){
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

// Função para retornar uma lista de músicas
const listarMusica = async function (){
    try {
        arrayMusicas = []

        //Criando um objeto JSON
        let dadosMusica = {

        }
        //Chama a função para retornar as músicas do Banco de Dados
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object'){
            if(resultMusica.length > 0){

                //Cria um JSON para colocar o ARRAY de músicas
                dadosMusica.status = true,
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length
                
                for (const itemMusica of resultMusica){
                    let dadosGenero = await controllerGeneroMusica.buscarGeneroPorMusica(itemMusica.id_musica)
                    itemMusica.genres = dadosGenero.generos
                    
                    arrayMusicas.push(itemMusica)
                }

                dadosMusica.musics = arrayMusicas

                return  dadosMusica
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

// Função para retornar uma música pelo ID
const buscarMusica = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let arrayMusicas = []
            //Criando um objeto JSON
            let dadosMusica = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){

                //Cria um JSON para colocar o ARRAY de músicas
                dadosMusica.status = true,
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length
                
                for (const itemMusica of resultMusica){
                    let dadosGenero = await controllerGeneroMusica.buscarGeneroPorMusica(itemMusica.id_musica)
                    itemMusica.genres = dadosGenero.generos
                    
                    arrayMusicas.push(itemMusica)
                }

                dadosMusica.musics = arrayMusicas

                return  dadosMusica
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

// Função para retornar uma música pelo ID do album
const buscarMusicaPeloAlbum = async function (id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let arrayMusicas = []
            //Criando um objeto JSON
            let dadosMusica = {}

            //Chama a função para retornar as músicas do Banco de Dados
            let resultMusica = await musicaDAO.selectMusicaByIdAlbum(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){

                //Cria um JSON para colocar o ARRAY de músicas
                dadosMusica.status = true,
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length

                for (const itemMusica of resultMusica){
                    let dadosGenero = await controllerGeneroMusica.buscarGeneroPorMusica(itemMusica.id_musica)
                    itemMusica.genres = dadosGenero.generos
                    
                    arrayMusicas.push(itemMusica)
                }

                dadosMusica.musics = arrayMusicas

                return  dadosMusica
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
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica,
    buscarMusicaPeloAlbum
}