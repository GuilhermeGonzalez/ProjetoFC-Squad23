const express = require('express');

const routes = express.Router();

const Receptor = require('./controllers/receptor.controllers');
const Doador = require('./controllers/doador.controllers');

//Rotas de Cadastro
routes.post('/api/receptor', Receptor.create);

//Rotas de Login
routes.post('/api/receptor.login', Receptor.login);

//Rota de busca de um Receptor
routes.get('/api/receptor.details/:_id', Receptor.details);

//Rotas de Atualização Especifica
routes.put('/api/receptor.meta', Receptor.updateMeta);
routes.put('/api/receptor.materiais', Receptor.updateMateriais);
routes.put('/api/receptor.historia', Receptor.updateHistoria);
routes.put('/api/receptor.dadosBancarios', Receptor.updateDadosBancarios);
routes.get('/api/receptor.valorArrecadado/:_id/:valorarrecadado', Receptor.valorArrecado);

//Rota de busca dos Receptores com filtros
routes.get('/api/receptor.findReceptor', Receptor.findReceptor);

//Rotas de Doadores Criação e Atualização
routes.post('/api/doador', Doador.create);


module.exports = routes;