const express = require('express');

const routes = express.Router();

const Receptor = require('./controllers/receptor.controllers');
const Doador = require('./controllers/doador.controllers');

routes.get('/',Receptor.index);

//Rotas de Receptores
routes.post('/api/receptor', Receptor.create);
routes.get('/api/receptor', Receptor.index);
routes.get('/api/receptor.details/:_id', Receptor.details);
routes.delete('/api/receptor/:_id', Receptor.delete);
routes.put('/api/receptor',Receptor.update);

//Rotas de Doadores
routes.post('/api/doador', Doador.create);
routes.get('/api/doador', Doador.index);
routes.get('/api/doador.details/:_id', Doador.details);
//routes.get('/api/doador.details/:email_rcpt', Doador.detailEmail)
routes.delete('/api/doador/:_id', Doador.delete);

module.exports = routes;