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
let controllerGenero = require('./controller/genero/controllerGenero.js')
let controllerBanda = require('./controller/banda/controllerBanda.js')
let controllerUsuario = require('./controller/usuario/controllerUsuario.js')
let controllerAlbum = require('./controller/album/controllerAlbum.js')

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

//Endpoint para buscar um usuario para login
app.get('/v1/controle-usuarios/usuario-login', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultUsuario = await controllerUsuario.buscarUsuarioLogin(dadosBody, contentType)

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

//------------------------------ENDPOINTS DO ALBUM-----------------------------------//

//Endpoint para inserir um album
app.post('/v1/controle-albuns/album', cors(), bodyParserJSON, async function(request, response){

    //Recebe o CONTENT TYPE da requisição 
    let contentType = request.headers['content-type']

    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para inserir os dados e aguarda o retorno da função
    let resultAlbum = await controllerAlbum.inserirAlbum(dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para listar todos os albuns
app.get('/v1/controle-albuns/album', cors(), async function(request, response){
    let resultAlbum = await controllerAlbum.listarAlbuns()

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para buscar um album pelo ID
app.get('/v1/controle-albuns/album/:id', cors(), async function(request, response){

    //Recebe o ID
    let idAlbum = request.params.id

    //Chama a função
    let resultAlbum = await controllerAlbum.buscarAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para deletar um album pelo ID
app.delete('/v1/controle-albuns/album/:id', cors(), async function(request, response){

    //Recebe o ID
    let idAlbum = request.params.id

    //Chama a função
    let resultAlbum = await controllerAlbum.excluirAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para atualizar um album pelo ID
app.put('/v1/controle-albuns/album/:id', cors(), bodyParserJSON, async function(request, response){

    //Rece o Content Type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID
    let idAlbum = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, BODY e CONTENT-TYPE
    let resultAlbum = await controllerAlbum.atualizarAlbum(idAlbum, dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.listen(8080, function(){
    console.log('API aguardando requisições...')
})