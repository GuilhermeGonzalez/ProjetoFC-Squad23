const express = require('express');

const routes = express.Router();

const Receptor = require('./controllers/receptor.controllers');

routes.get('/',Receptor.index);

//Rotas de Receptores
routes.post('/api/receptor', Receptor.create);
routes.get('/api/receptor', Receptor.index);
routes.get('/api/receptor.details', Receptor.details);
routes.delete('api/receptor/?_id=', Receptor.delete);

module.exports = routes;