/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const generoBandaDAO = require('../../model/DAO/generos_bandas.js')

//Função para tratar a inserção de um novo genero_banda no DAO
const inserirGeneroBanda = async function(generoBanda){
    try {
            if (
                generoBanda.id_genero == '' || generoBanda.id_genero  == undefined || generoBanda.id_genero == null || isNaN(generoBanda.id_genero) || generoBanda.id_genero<=0 ||
                generoBanda.id_banda == ''  || generoBanda.id_banda  == undefined  || generoBanda.id_banda == null  || isNaN(generoBanda.id_banda)  || generoBanda.id_banda<=0
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultGeneroBanda = await generoBandaDAO.insertGeneroBanda(generoBanda)

                if(resultGeneroBanda)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero_banda no DAO
const atualizarGeneroBanda = async function(id, generoBanda, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (generoBanda.id_genero_banda  == '' || generoBanda.id_genero_banda  == undefined || generoBanda.id_genero_banda  == null || isNaN(generoBanda.id_genero_banda)  || generoBanda.id_genero_musica <= 0 ||
                    generoBanda.id_genero        == '' || generoBanda.id_genero        == undefined || generoBanda.id_genero        == null || isNaN(generoBanda.id_genero)        || generoBanda.id_genero        <= 0 ||
                    generoBanda.musica           == '' || generoBanda.musica           == undefined || generoBanda.musica           == null || isNaN(generoBanda.musica)           || generoBanda.musica           <= 0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultGeneroBanda = await generoBandaDAO.selectByIdGeneroBanda(parseInt(id))

                    if(resultGeneroBanda != false || typeof(resultGeneroBanda) == 'object'){
                        if(resultGeneroBanda.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            generoBanda.id = parseInt(id)

                            let result = await generoBandaDAO.updateGeneroBanda(generoBanda)

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

//Função para tratar a exclusão de um genero_banda no DAO
const excluirGeneroBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultGeneroBanda = await generoBandaDAO.selectByIdGeneroBanda(parseInt(id))

            if(resultGeneroBanda != false || typeof(resultGeneroBanda) == 'object'){
                //Se existir, faremos o delete
                if(resultGeneroBanda.length > 0){
                    //delete
                    let result = await generoBandaDAO.deleteGeneroBanda(parseInt(id))

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

//Função para tratar a exclusão de um genero_banda no DAO pelo ID da banda
const excluirGeneroBandaByIdBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await generoBandaDAO.deleteGeneroBandaByIdBanda(parseInt(id))

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

//Função para tratar o retorno de uma lista de generos_bandas do DAO
const listarGenerosBandas = async function(){
    try {
        //Objeto do tipo JSON
        let dadosGeneroBanda = {}
        //Chama a função para retornar os generos cadastrados
        let resultGeneroBanda = await generoBandaDAO.selectAllGenerosBandas()

        if(resultGeneroBanda != false || typeof(resultGeneroBanda) == 'object'){
            if(resultGeneroBanda.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosGeneroBanda.status = true
                dadosGeneroBanda.status_code = 200
                dadosGeneroBanda.items = resultGeneroBanda.length
                dadosGeneroBanda.generos_banda = resultGeneroBanda

                return dadosGeneroBanda
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

//Função para tratar o retorno de um genero_banda filtrando pelo ID
const buscarGeneroBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosGeneroBanda = {}

            let resultGeneroBanda = await generoBandaDAO.selectByIdGeneroBanda(parseInt(id))
            
            if(resultGeneroBanda != false || typeof(resultGeneroBanda) == 'object'){
                if(resultGeneroBanda.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosGeneroBanda.status = true
                    dadosGeneroBanda.status_code = 200
                    dadosGeneroBanda.genero = resultGeneroBanda

                    return dadosGeneroBanda //200
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

//Função para retornar os generos pelo id da banda
const buscarGeneroPorBanda = async function(idBanda){
    try {
        if(idBanda == '' || idBanda == undefined || idBanda == null || isNaN(idBanda) || idBanda <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await generoBandaDAO.selectGeneroByIdBanda(parseInt(idBanda))
            
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

//Função para retornar as bandas pelo id do genero
const buscarBandasPorGenero = async function(idGenero){

    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosBanda = {}

            let resultBanda = await generoBandaDAO.selectBandasByIdGenero(parseInt(idGenero))
            
            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosBanda.status = true
                    dadosBanda.status_code = 200
                    dadosBanda.musics = resultBanda

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



module.exports = {
    inserirGeneroBanda,
    atualizarGeneroBanda,
    excluirGeneroBanda,
    excluirGeneroBandaByIdBanda,
    listarGenerosBandas,
    buscarGeneroBanda,
    buscarGeneroPorBanda,
    buscarBandasPorGenero
} 