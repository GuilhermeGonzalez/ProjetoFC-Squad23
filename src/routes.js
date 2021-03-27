const express = require('express');

const routes = express.Router();

const Receptor = require('./controllers/receptor.controllers');

routes.get('/',Receptor.index);
routes.post('/api/receptor', Receptor.create);

module.exports = routes;