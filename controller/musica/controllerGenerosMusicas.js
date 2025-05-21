/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Genero Musicas
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const generoMusicaDAO = require('../../model/DAO/generos_musicas.js')

//Função para tratar a inserção de um novo genero_musica no DAO
const inserirGeneroMusica = async function(generoMusica, contentType){
    try {
            if (
                generoMusica.id_genero == '' || generoMusica.id_genero  == undefined || generoMusica.id_genero == null || isNaN(generoMusica.id_genero) || generoMusica.id_genero<=0 ||
                generoMusica.id_musica == '' || generoMusica.id_musica  == undefined || generoMusica.id_musica == null || isNaN(generoMusica.id_musica) || generoMusica.id_musica<=0
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultGeneroMusica = await generoMusicaDAO.insertGeneroMusica(generoMusica)

                if(resultGeneroMusica)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero_musica no DAO
const atualizarGeneroMusica = async function(id, generoMusica, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (generoMusica.id_genero_musica == '' || generoMusica.id_genero_musica == undefined || generoMusica.id_genero_musica == null || isNaN(generoMusica.id_genero_musica) || generoMusica.id_genero_musica <= 0 ||
                    generoMusica.id_genero        == '' || generoMusica.id_genero        == undefined || generoMusica.id_genero        == null || isNaN(generoMusica.id_genero)        || generoMusica.id_genero        <=0  ||
                    generoMusica.id_musica        == '' || generoMusica.id_musica        == undefined || generoMusica.id_musica        == null || isNaN(generoMusica.id_musica)        || generoMusica.id_musica        <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultGeneroMusica = await generoMusicaDAO.selectByIdGeneroMusica(parseInt(id))

                    if(resultGeneroMusica != false || typeof(resultGeneroMusica) == 'object'){
                        if(resultGeneroMusica.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            generoMusica.id = parseInt(id)

                            let result = await generoMusicaDAO.updateGeneroMusica(generoMusica)

                            if(result){
                                return message.SUCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero_musica no DAO
const excluirGeneroMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultGeneroMusica = await generoMusicaDAO.selectByIdGeneroMusica(parseInt(id))

            if(resultGeneroMusica != false || typeof(resultGeneroMusica) == 'object'){
                //Se existir, faremos o delete
                if(resultGeneroMusica.length > 0){
                    //delete
                    let result = await generoMusicaDAO.deleteGeneroMusica(parseInt(id))

                    if(result){
                        return message.SUCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero_musica no DAO pelo ID da musica
const excluirGeneroMusicaByIdMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await generoMusicaDAO.deleteGeneroMusicaByIdMusica(parseInt(id))

                if(result){
                    return message.SUCESS_DELETED_ITEM //200
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero_musica no DAO pelo ID do genero
const excluirGeneroMusicaByIdGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await generoMusicaDAO.deleteGeneroMusicaByIdGenero(parseInt(id))

                if(result){
                    return message.SUCESS_DELETED_ITEM //200
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos_musicas do DAO
const listarGenerosMusicas = async function(){
    try {
        //Objeto do tipo JSON
        let dadosGeneroMusica = {}
        //Chama a função para retornar os generos cadastrados
        let resultGeneroMusica = await generoMusicaDAO.selectAllGenerosMusicas()

        if(resultGeneroMusica != false || typeof(resultGeneroMusica) == 'object'){
            if(resultGeneroMusica.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosGeneroMusica.status = true
                dadosGeneroMusica.status_code = 200
                dadosGeneroMusica.items = resultGeneroMusica.length
                dadosGeneroMusica.films = resultGeneroMusica

                return dadosGeneroMusica
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero_musica filtrando pelo ID
const buscarGeneroMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosGeneroMusica = {}

            let resultGeneroMusica = await generoMusicaDAO.selectByIdGeneroMusica(parseInt(id))
            
            if(resultGeneroMusica != false || typeof(resultGeneroMusica) == 'object'){
                if(resultGeneroMusica.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosGeneroMusica.status = true
                    dadosGeneroMusica.status_code = 200
                    dadosGeneroMusica.genero = resultGeneroMusica

                    return dadosGeneroMusica //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos pelo id da musica
const buscarGeneroPorMusica = async function(idMusica){
    try {
        if(idMusica == '' || idMusica == undefined || idMusica == null || isNaN(idMusica) || idMusica <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await generoMusicaDAO.selectGeneroByIdMusica(parseInt(idMusica))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.generos = resultgenero

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar as musicas pelo id do genero
const buscarMusicaPorGenero = async function(idGenero){

    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusica = {}

            let resultMusica = await generoMusicaDAO.selectMusicasByIdGenero(parseInt(idGenero))
            
            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musics = resultMusica

                    return dadosMusica //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirGeneroMusica,
    atualizarGeneroMusica,
    excluirGeneroMusica,
    excluirGeneroMusicaByIdMusica,
    excluirGeneroMusicaByIdGenero,
    listarGenerosMusicas,
    buscarGeneroMusica,
    buscarGeneroPorMusica,
    buscarMusicaPorGenero
} 