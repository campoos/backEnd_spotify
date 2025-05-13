/*********************************************************************
* Objetivo: Criar uma API para realizar integração com banco de dados
* Data: 11/02/2025
* Autor: João
* Versão: 1.0
**********************************************************************
* Observações: 
*
* Para criar a API precisa instalar:
*   express         npm install express --save
8   cors            npm install cors --save
*   body-parser     npm install body --save
*
*
*Para criar a conexão com o banco de dados precisa instalar:
*   prisma          npm install prisma --save
*   @prisma/client  npm install @prisma/client --save
*
* Após a instalação do prisma e @prisma/client, devemos?
*   npx prisma init     Para inicializar o prisma no projeto
* Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comando:
*   npx prisma migrate dev
********************************************************************/ 

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Import das Controllers do projeto
let controllerMusica = require('./controller/musica/controllerMusica.js')
let controllerFuncaoCreditado = require('./controller/funcao-creditado/controllerFuncaoCreditado.js')
let controllerIdioma = require('./controller/idioma/controllerIdioma.js')
let controllerGenero = require('./controller/genero/controllerGenero.js')
let controllerFuncaoIntegrante = require('./controller/funcao_integrante/controllerFuncaoIntegrante.js')
let controllerIntegrante = require('./controller/integrante/controllerIntegrante.js')
let controllerCreditado = require('./controller/creditado/controllerCreditado.js')
let controllerBanda = require('./controller/banda/controllerBanda.js')
let controllerUsuario = require('./controller/usuario/controllerUsuario.js')

//Cria um objeto para o body do tipo JSON
const bodyParserJSON = bodyParser.json()

//Cria um objeto do app para criar a API
const app = express()

//request - Significa a chegada de dados na API
//response - Significa a saída de dados da API

//Configurações de permissões do CORS para a API
app.use((request, response, next)=>{
    //Permissão de acesso para quem irá chamar a API
    response.header('Acess-Control-Allow-Origin', '*')
    //Permissão de acesso para quais métodos a API irá responder
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Ativa as configurações do header para o cors()
    app.use(cors())


    next()
})

//----------------------------------------ENDPOINTS DA MÚSICA-----------------------------------//

//Endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para listar as todas as músicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para buscar uma música pelo ID
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    //Recebe o ID
    let idMusica = request.params.id

    //Chama a função
    let resultMusica = await controllerMusica.buscarMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para deletar uma música pelo ID
app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    //Recebe o ID
    let idMusica = request.params.id

    //Chama a função
    let resultMusica = await controllerMusica.excluirMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para atualizar uma música pelo ID
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idMusica = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//------------------------------ENDPOINTS DA FUNÇÃO DE CREDITADO-----------------------------------//

//Endpoint para inserir uma função de creditado
app.post('/v1/controle-funcoes-creditados/funcao-creditado', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultFuncaoCreditado = await controllerFuncaoCreditado.inserirFuncaoCreditado(dadosBody, contentType)

    response.status(resultFuncaoCreditado.status_code)
    response.json(resultFuncaoCreditado)
})

//Endpoint para listar as todas as funções dos creditados
app.get('/v1/controle-funcoes-creditados/funcao-creditado', cors(), async function(request, response){
    let resultFuncaoCreditado = await controllerFuncaoCreditado.listarFuncoesCreditados()

    response.status(resultFuncaoCreditado.status_code)
    response.json(resultFuncaoCreditado)
})

//Endpoint para buscar uma função de creditado pelo ID
app.get('/v1/controle-funcoes-creditados/funcao-creditado/:id', cors(), async function(request, response){

    //Recebe o ID
    let idFuncaoCreditado = request.params.id

    //Chama a função
    let resultFuncaoCreditado = await controllerFuncaoCreditado.buscarFuncaoCreditado(idFuncaoCreditado)

    response.status(resultFuncaoCreditado.status_code)
    response.json(resultFuncaoCreditado)
})

//Endpoint para deletar uma função de creditado pelo ID
app.delete('/v1/controle-funcoes-creditados/funcao-creditado/:id', cors(), async function(request, response){

    //Recebe o ID
    let idFuncaoCreditado = request.params.id

    //Chama a função
    let resultFuncaoCreditado = await controllerFuncaoCreditado.excluirFuncaoCreditado(idFuncaoCreditado)

    response.status(resultFuncaoCreditado.status_code)
    response.json(resultFuncaoCreditado)
})

//Endpoint para atualizar uma função de creditado pelo ID
app.put('/v1/controle-funcoes-creditados/funcao-creditado/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idFuncaoCreditado = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultFuncaoCreditado = await controllerFuncaoCreditado.atualizarFuncaoCreditado(idFuncaoCreditado, dadosBody, contentType)

    response.status(resultFuncaoCreditado.status_code)
    response.json(resultFuncaoCreditado)
})

//------------------------------ENDPOINTS DO IDIOMA-----------------------------------//

//Endpoint para inserir um novo idioma
app.post('/v1/controle-idiomas/idioma', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultIdioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//Endpoint para listar todos os idiomas
app.get('/v1/controle-idiomas/idioma', cors(), async function(request, response){
    let resultIdioma = await controllerIdioma.listarIdiomas()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//Endpoint para buscar um idioma pelo ID
app.get('/v1/controle-idiomas/idioma/:id', cors(), async function(request, response){

    //Recebe o ID
    let idIdioma = request.params.id

    //Chama a função
    let resultIdioma = await controllerIdioma.buscarIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//Endpoint para deletar um idioma pelo ID
app.delete('/v1/controle-idiomas/idioma/:id', cors(), async function(request, response){

    //Recebe o ID
    let idIdioma = request.params.id

    //Chama a função
    let resultIdioma = await controllerIdioma.excluirIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//Endpoint para atualizar um idioma pelo ID
app.put('/v1/controle-idiomas/idioma/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idIdioma = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultIdioma = await controllerIdioma.atualizarIdioma(idIdioma, dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

//------------------------------ENDPOINTS DO GENERO-----------------------------------//

//Endpoint para inserir um novo genero
app.post('/v1/controle-generos/genero', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para listar todos os generos
app.get('/v1/controle-generos/genero', cors(), async function(request, response){
    let resultGenero = await controllerGenero.listarGeneros()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para buscar um genero pelo ID
app.get('/v1/controle-generos/genero/:id', cors(), async function(request, response){

    //Recebe o ID
    let idGenero = request.params.id

    //Chama a função
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para deletar um genero pelo ID
app.delete('/v1/controle-generos/genero/:id', cors(), async function(request, response){

    //Recebe o ID
    let idGenero = request.params.id

    //Chama a função
    let resultGenero = await controllerGenero.exlcuirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para atualizar um genero pelo ID
app.put('/v1/controle-generos/genero/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idGenero = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//------------------------------ENDPOINTS DA FUNÇÃO DO INTEGRANTE-----------------------------------//

//Endpoint para inserir uma nova função de integrante
app.post('/v1/controle-funcoes-integrantes/funcao-integrante', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultFuncaoIntegrante = await controllerFuncaoIntegrante.inserirFuncaoIntegrante(dadosBody, contentType)

    response.status(resultFuncaoIntegrante.status_code)
    response.json(resultFuncaoIntegrante)
})

//Endpoint para listar todas as funções do integrantes
app.get('/v1/controle-funcoes-integrantes/funcao-integrante', cors(), async function(request, response){
    let resultFuncaoIntegrante = await controllerFuncaoIntegrante.listarFuncoesIntegrantes()

    response.status(resultFuncaoIntegrante.status_code)
    response.json(resultFuncaoIntegrante)
})

//Endpoint para buscar uma função de integrante pelo ID
app.get('/v1/controle-funcoes-integrantes/funcao-integrante/:id', cors(), async function(request, response){

    //Recebe o ID
    let idFuncaoIntegrante = request.params.id

    //Chama a função
    let resultFuncaoIntegrante = await controllerFuncaoIntegrante.buscarFuncaoIntegrante(idFuncaoIntegrante)

    response.status(resultFuncaoIntegrante.status_code)
    response.json(resultFuncaoIntegrante)
})

//Endpoint para deletar uma função de integrante pelo ID
app.delete('/v1/controle-funcoes-integrantes/funcao-integrante/:id', cors(), async function(request, response){

    //Recebe o ID
    let idFuncaoIntegrante = request.params.id

    //Chama a função
    let resultFuncaoIntegrante = await controllerFuncaoIntegrante.excluirFuncaoIntegrante(idFuncaoIntegrante)

    response.status(resultFuncaoIntegrante.status_code)
    response.json(resultFuncaoIntegrante)
})

//Endpoint para atualizar uma função de integrante pelo ID
app.put('/v1/controle-funcoes-integrantes/funcao-integrante/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idFuncaoIntegrante = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultFuncaoIntegrante = await controllerFuncaoIntegrante.atualizarFuncaoIntegrante(idFuncaoIntegrante, dadosBody, contentType)

    response.status(resultFuncaoIntegrante.status_code)
    response.json(resultFuncaoIntegrante)
})

//------------------------------ENDPOINTS DO INTEGRANTE-----------------------------------//

//Endpoint para inserir um novo integrante
app.post('/v1/controle-integrantes/integrante', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultIntegrante = await controllerIntegrante.inserirIntegrante(dadosBody, contentType)

    response.status(resultIntegrante.status_code)
    response.json(resultIntegrante)
})

//Endpoint para listar todas os integrantes
app.get('/v1/controle-integrantes/integrante', cors(), async function(request, response){
    let resultIntegrante = await controllerIntegrante.listarIntegrantes()

    response.status(resultIntegrante.status_code)
    response.json(resultIntegrante)
})

//Endpoint para buscar um integrante pelo ID
app.get('/v1/controle-integrantes/integrante/:id', cors(), async function(request, response){

    //Recebe o ID
    let idIntegrante = request.params.id

    //Chama a função
    let resultIntegrante = await controllerIntegrante.buscarIntegrante(idIntegrante)

    response.status(resultIntegrante.status_code)
    response.json(resultIntegrante)
})

//Endpoint para deletar um integrante pelo ID
app.delete('/v1/controle-integrantes/integrante/:id', cors(), async function(request, response){

    //Recebe o ID
    let idIntegrante = request.params.id

    //Chama a função
    let resultIntegrante = await controllerIntegrante.excluirIntegrante(idIntegrante)

    response.status(resultIntegrante.status_code)
    response.json(resultIntegrante)
})

//Endpoint para atualizar um integrante pelo ID
app.put('/v1/controle-integrantes/integrante/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idIntegrante = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultIntegrante = await controllerIntegrante.atualizarIntegrante(idIntegrante, dadosBody, contentType)

    response.status(resultIntegrante.status_code)
    response.json(resultIntegrante)
})

//------------------------------ENDPOINTS DO CREDITADO-----------------------------------//

//Endpoint para inserir um creditado
app.post('/v1/controle-creditados/creditado', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultCreditado = await controllerCreditado.inserirCreditado(dadosBody, contentType)

    response.status(resultCreditado.status_code)
    response.json(resultCreditado)
})

//Endpoint para listar as todos os creditados
app.get('/v1/controle-creditados/creditado', cors(), async function(request, response){
    let resultCreditado = await controllerCreditado.listarCreditados()

    response.status(resultCreditado.status_code)
    response.json(resultCreditado)
})

//Endpoint para buscar um creditado pelo ID
app.get('/v1/controle-creditados/creditado/:id', cors(), async function(request, response){

    //Recebe o ID
    let idCreditado = request.params.id

    //Chama a função
    let resultCreditado = await controllerCreditado.buscarCreditado(idCreditado)

    response.status(resultCreditado.status_code)
    response.json(resultCreditado)
})

//Endpoint para deletar um creditado pelo ID
app.delete('/v1/controle-creditados/creditado/:id', cors(), async function(request, response){

    //Recebe o ID
    let idCreditado = request.params.id

    //Chama a função
    let resultCreditado = await controllerCreditado.excluirCreditado(idCreditado)

    response.status(resultCreditado.status_code)
    response.json(resultCreditado)
})

//Endpoint para atualizar um creditado pelo ID
app.put('/v1/controle-creditados/creditado/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idCreditado = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultCreditado = await controllerCreditado.atualizarCreditado(idCreditado, dadosBody, contentType)

    response.status(resultCreditado.status_code)
    response.json(resultCreditado)
})

//------------------------------ENDPOINTS DA BANDA-----------------------------------//

//Endpoint para inserir uma banda
app.post('/v1/controle-bandas/banda', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultBanda = await controllerBanda.inserirBanda(dadosBody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para listar todas as bandas
app.get('/v1/controle-bandas/banda', cors(), async function(request, response){
    let resultBanda = await controllerBanda.listarBandas()

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para buscar uma banda pelo ID
app.get('/v1/controle-bandas/banda/:id', cors(), async function(request, response){

    //Recebe o ID
    let idBanda = request.params.id

    //Chama a função
    let resultBanda = await controllerBanda.buscarBanda(idBanda)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para deletar uma banda pelo ID
app.delete('/v1/controle-bandas/banda/:id', cors(), async function(request, response){

    //Recebe o ID
    let idBanda = request.params.id

    //Chama a função
    let resultBanda = await controllerBanda.excluirBanda(idBanda)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para atualizar uma banda pelo ID
app.put('/v1/controle-bandas/banda/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idBanda = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultBanda = await controllerBanda.atualizarBanda(idBanda, dadosBody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//------------------------------ENDPOINTS DO USUARIO-----------------------------------//

//Endpoint para inserir um usuario
app.post('/v1/controle-usuarios/usuario', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para listar todas os usuarios
app.get('/v1/controle-usuarios/usuario', cors(), async function(request, response){
    let resultUsuario = await controllerUsuario.listarUsuarios()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para buscar um usuario pelo ID
app.get('/v1/controle-usuarios/usuario/:id', cors(), async function(request, response){

    //Recebe o ID
    let idUsuario = request.params.id

    //Chama a função
    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para deletar um usuario pelo ID
app.delete('/v1/controle-usuarios/usuario/:id', cors(), async function(request, response){

    //Recebe o ID
    let idUsuario = request.params.id

    //Chama a função
    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para atualizar um usuario pelo ID
app.put('/v1/controle-usuarios/usuario/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idUsuario = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})



app.listen(8080, function(){
    console.log('API aguardando requisições...')
})