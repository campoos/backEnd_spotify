/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const curtidaDAO = require('../../model/DAO/curtida.js')

//função para pegar a data atual
function getDataAtualFormatada() {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

//Função para tratar a inserção de uma nova curtida no DAO
const inserirCurtida = async function(curtida){

    curtida.data_curtida = getDataAtualFormatada()
    try {
            if (
                curtida.data_curtida  == "" || curtida.data_curtida == null      || curtida.data_curtida == undefined || curtida.data_curtida.length >10 || isNaN(Date.parse(curtida.data_curtida))     ||
                curtida.id_usuario    == '' || curtida.id_usuario   == undefined || curtida.id_usuario   == null      || isNaN(curtida.id_usuario)       || curtida.id_usuario                      <=0 ||
                curtida.id_musica     == '' || curtida.id_musica    == undefined || curtida.id_musica    == null      || isNaN(curtida.id_musica)        || curtida.id_musica                       <=0
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultCurtida = await curtidaDAO.insertCurtida(curtida)

                if(resultCurtida)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de uma curtida no DAO
const excluirCurtida = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultCurtida = await curtidaDAO.selectByIdCurtida(parseInt(id))

            if(resultCurtida != false || typeof(resultCurtida) == 'object'){
                //Se existir, faremos o delete
                if(resultCurtida.length > 0){
                    //delete
                    let result = await curtidaDAO.deleteCurtida(parseInt(id))

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

//Função para tratar a exclusão de uma curtida no DAO pelo ID do usuario
const excluirCurtidaByIdUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await curtidaDAO.deleteCurtidaByIdUsuario(parseInt(id))

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

//Função para tratar a exclusão de uma curtida no DAO pelo ID da musica
const excluirCurtidaByIdMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
                let result = await curtidaDAO.deleteCurtidaByIdMusica(parseInt(id))

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

//Função para tratar o retorno de musicas curtidas filtrando pelo ID do usuario
const getMusicasPeloUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusica = {}

            let resultMusica = await curtidaDAO.selectMusicaByIdUsuario(parseInt(id))
            
            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musicas = resultMusica

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

//Função para tratar o retorno de curtidas filtrando pelo ID da musica
const getCurtidasPelaMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosCurtida = {}

            let resultCurtida = await curtidaDAO.getCurtidasByIdMusica(parseInt(id))
            
            if(resultCurtida != false || typeof(resultCurtida) == 'object'){
                if(resultCurtida.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosCurtida.status = true
                    dadosCurtida.status_code = 200
                    dadosCurtida.curtidas = resultCurtida.length

                    return dadosCurtida //200
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
    inserirCurtida,
    excluirCurtida,
    excluirCurtidaByIdUsuario,
    excluirCurtidaByIdMusica,
    getMusicasPeloUsuario,
    getCurtidasPelaMusica
}