/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de musica banda
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const musicaBandaDAO = require('../../model/DAO/musicas_bandas.js')
const { buscarGeneroPorBanda } = require('../banda/controllerGeneroBanda.js')

//Função para tratar a inserção de uma nova musica_banda no DAO
const inserirMusicaBanda = async function(musicaBanda){
    try {
            if (
                musicaBanda.id_musica == '' || musicaBanda.id_musica  == undefined || musicaBanda.id_musica == null || isNaN(musicaBanda.id_musica) || musicaBanda.id_musica <=0 ||
                musicaBanda.id_banda  == '' || musicaBanda.id_banda   == undefined || musicaBanda.id_banda  == null || isNaN(musicaBanda.id_banda)  || musicaBanda.id_banda <=0
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
    
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultMusicaBanda = await musicaBandaDAO.insertMusicaBanda(musicaBanda)

                if(resultMusicaBanda)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de uma musica_banda no DAO
const atualizarMusicaBanda = async function(id, musicaBanda, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (musicaBanda.id_musica_banda  == '' || musicaBanda.id_musica_banda  == undefined || musicaBanda.id_musica_banda  == null || isNaN(musicaBanda.id_musica_banda ) || musicaBanda.id_musica_banda  <= 0 ||
                    musicaBanda.id_musica        == '' || musicaBanda.id_musica        == undefined || musicaBanda.id_musica        == null || isNaN(musicaBanda.id_musica)        || musicaBanda.id_musica        <= 0 ||
                    musicaBanda.id_banda         == '' || musicaBanda.id_banda         == undefined || musicaBanda.id_banda         == null || isNaN(musicaBanda.id_banda)         || musicaBanda.id_banda         <= 0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultMusicaBanda = await musicaBandaDAO.selectByIdMusicaBanda(parseInt(id))

                    if(resultMusicaBanda != false || typeof(resultMusicaBanda) == 'object'){
                        if(resultMusicaBanda.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            musicaBanda.id = parseInt(id)

                            let result = await musicaBandaDAO.updateMusicaBanda(musicaBanda)

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

//Função para tratar a exclusão de uma musica_banda na DAO
const excluirMusicaBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultMusicaBanda = await musicaBandaDAO.selectByIdMusicaBanda(parseInt(id))

            if(resultMusicaBanda != false || typeof(resultMusicaBanda) == 'object'){
                //Se existir, faremos o delete
                if(resultMusicaBanda.length > 0){
                    //delete
                    let result = await musicaBandaDAO.deleteMusicaBanda(parseInt(id))

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

//Função para tratar a exclusão de uma musica_banda no DAO pelo ID da musica
const excluirMusicaBandaByIdMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await musicaBandaDAO.deleteMusicaBandaByIdMusica(parseInt(id))

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

//Função para tratar a exclusão de uma musica_banda no DAO pelo ID da banda
const excluirMusicaBandaByIdBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await musicaBandaDAO.deleteMusicaBandaByIdBanda(parseInt(id))

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

//Função para tratar o retorno de uma lista de musicas_bandas do DAO
const listarMusicasBandas = async function(){
    try {
        //Objeto do tipo JSON
        let dadosMusicaBanda = {}
        //Chama a função para retornar os generos cadastrados
        let resultMusicaBanda = await musicaBandaDAO.selectAllMusicasBandas()

        if(resultMusicaBanda != false || typeof(resultMusicaBanda) == 'object'){
            if(resultMusicaBanda.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosMusicaBanda.status = true
                dadosMusicaBanda.status_code = 200
                dadosMusicaBanda.items = resultMusicaBanda.length
                dadosMusicaBanda.musicas_bandas = resultMusicaBanda

                return dadosMusicaBanda
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

//Função para tratar o retorno de uma musica_banda filtrando pelo ID
const buscarMusicaBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusicaBanda = {}

            let resultMusicaBanda = await musicaBandaDAO.selectByIdMusicaBanda(parseInt(id))
            
            if(resultMusicaBanda != false || typeof(resultMusicaBanda) == 'object'){
                if(resultMusicaBanda.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusicaBanda.status = true
                    dadosMusicaBanda.status_code = 200
                    dadosMusicaBanda.genero = resultMusicaBanda

                    return dadosMusicaBanda //200
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

//Função para retornar as bandas pelo id da musica
const buscarBandaPorMusica = async function(idMusica){
    try {
        if(idMusica == '' || idMusica == undefined || idMusica == null || isNaN(idMusica) || idMusica <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let arrayBanda = []

            let dadosBanda = {}

            let resultBanda = await musicaBandaDAO.selectBandasByIdMusica(parseInt(idMusica))
            
            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosBanda.status = true
                    dadosBanda.status_code = 200

                    for (const item of resultBanda){
                        let dadosGenero = await buscarGeneroPorBanda(item.id_banda)
                        item.generos = dadosGenero.generos

                        arrayBanda.push(item)
                    }

                    dadosBanda.bandas = arrayBanda

                    return dadosBanda //200
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

//Função para retornar as musicas pelo id da banda
const buscarMusicaPorBanda = async function(idBanda){

    try {
        if(idBanda == '' || idBanda == undefined || idBanda == null || isNaN(idBanda) || idBanda <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusica = {}

            let resultMusica = await musicaBandaDAO.selectMusicaByIdBanda(parseInt(idBanda))
            
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
    inserirMusicaBanda,
    atualizarMusicaBanda,
    excluirMusicaBanda,
    excluirMusicaBandaByIdMusica,
    excluirMusicaBandaByIdBanda,
    listarMusicasBandas,
    buscarMusicaBanda,
    buscarBandaPorMusica,
    buscarMusicaPorBanda
} 